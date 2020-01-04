const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const db ="mongodb+srv://Abdurrazack:Abdurrazack@cluster0-qfh8b.mongodb.net/ParksmardDB?retryWrites=true&w=majority";

mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true },error => {
    if (error) {
      console.error("Error:" + error);
    } else {
      console.log("Connection to Database Succeeded..");
    }
  }
);

router.post("/register", (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, registeredUser) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(registeredUser);
    }
  });
});

router.post("/login", (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send("Invalid Email");
      } else {
        if (user.password != userData.password) {
          res.status(401).send("Invalid Password");
        }else{
            res.status(200).send(user);
        }
      }
    }
  });
});

module.exports = router;
