const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const mongoose = require("mongoose");
const db = "mongodb+srv://Abdurrazack:Abdurrazack@cluster0-qfh8b.mongodb.net/ParksmardDB?retryWrites=true&w=majority";

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, error => {
  if (error) {
    console.error("Error:" + error);
  } else {
    console.log("Connection to Database Succeeded..");
  }
}
);

// register api
router.post("/register", (req, res) => {
  let userData = req.body;
  let newUser = new User(userData);
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    //if a user was found, that means the user's email matches the entered email
    if (user) {
      res.status(400).send('This email has already been registered')
    } else {
      newUser.save((err, registeredUser) => {
        res.status(200).send(registeredUser.fullName + ' ' + 'registered successfully');
      })
    }
  });
});

// login api
router.post("/login", (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send("Invalid Email");
      } else {
        let payload = { subject: user._id }
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({ token });
      }

    }
  });
});

// Getting user details api
router.get("/getUserDetails", (req, res) => {
  let email = req.params.email;
  User.findOne({ email: email }, (error, user) => {
    if (error) {
      res.status(404).send('User Not Found')
    } else {
      res.status(200).send(user);
    }
  });
})


module.exports = router;
