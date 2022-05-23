const express = require("express");
const router = express.Router();
//const mongoose = require("mongoose");
const Users = require("../models/users");

router.get("/", async (req, res) => {
  try {
    //quering the data in aphetical order
    const users = await Users.find().sort({ FirstName: 1 });
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const newUser = new Users({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    email: req.body.email,
    PhoneNumber: req.body.PhoneNumber,
    OTP: req.body.OTP,
  });
  try {
    const savedUsers = await newUser.save();
    res.json(savedUsers);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const specificuser = await Users.findById(req.params.id);
    res.json(specificuser);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
