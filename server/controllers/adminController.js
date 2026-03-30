// const express = require("express")

// const mongoose = require("mongoose")\

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const admin = require("../models/authModel");

const SECRET_KEY = process.env.SECRET_KEY;

// SIGNUP
const handleSignUpAdminController = async (req, res) => {
  const body = req.body;

  if (!body?.firstName || !body?.email || !body?.password) {
    return res.status(400).json({
      message: "required All Field",
      success: false,
    });
  }

  try {

    // const existingAdmin = await admin.findOne({ email: body.email });
    // if (existingAdmin) {
    //   return res.status(400).json({ 
    //     message: "Email Already Exists", 
    //     success: false 
    //   });
    // }

    const saltCount = 10;

    const hashedPassword = await bcrypt.hash(body.password, saltCount);

    console.log("hashing-password", hashedPassword);

    const signUp = await admin.insertOne({ ...body, password: hashedPassword });

    if (signUp) {
      return res.status(200).json({
        message: "Admin Added Successfully",
        success: true,
        id: signUp._id,
      });
    }
  } catch (error) {
    if(error.code === 11000){
      return res.status(400).json({
      message : "Email Already Exits",
    //   message: "Something Went Wrong",
      success: false,
    });
    }
    return res.status(500).json({ message: error.message, success: false });

  }
};

// LOGIN
const handleSignInAdminController = async (req, res) => {
  try {
    const body = req.body;

    if (!body.email || !body.password) {
      return res
        .status(500)
        .json({ message: "Email And PassWord Required ", success: false });
    }

    const adminUser = await admin.findOne({ email: body.email });

    if (!adminUser) {
      return res.status(400).json({
        message: "Wrong Username And PassWord",
        success: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      body.password,
      adminUser.password,
    );

    console.log("password matched ", isPasswordMatched);

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Wrong Password ",
        success: false,
      });
    }

    const token = jwt.sign(
      { email: adminUser?.email, id: adminUser?._id },
      SECRET_KEY,
    );

    return res.status(200).json({
      message: "Admin Loged In Successfully ",
      success: true,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { handleSignUpAdminController, handleSignInAdminController };
