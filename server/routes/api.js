const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
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
      bcrypt.hash(userData.password, 10, (err, hash) => {
        newUser.password = hash
        newUser.save((err, registeredUser) => {
          if (err) {
            res.status(500).send('Error in registering new user')
          } else {
            res.status(200).send(registeredUser.fullName + ' ' + 'registered successfully');
          }
        })
      });
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
        res.status(401).send("Email you have entered is incorrect");
      } else {
      bcrypt.compare(userData.password, user.password,(err,loggedIn)=>{
        if(loggedIn){
          let payload = { subject: user._id }
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({ token });
        }else{
          res.sendStatus(403)
        }}) 
      }
    }
  });
});

// Getting user details api
router.get("/getUserDetails/:email", (req, res) => {
  let email = req.params.email;
  User.findOne({ email: email }, (error, user) => {
    if (error) {
      res.status(404).send('User Not Found')
    } else {
      res.status(200).send(user);
    }
  });
})

router.get("/getAllUsers", (req, res) => {
  User.find({}, (err, users) =>{
    res.status(200).send(users);
  })
})

router.delete('/deleteUser/:id', (req, res) =>{
  userId = req.params.id;
  User.findByIdAndRemove({_id: userId}, (err) =>{
    if (err) {
      res.status(500).send();
    }
    return res.status(200).send();
  })
})

module.exports = router;


