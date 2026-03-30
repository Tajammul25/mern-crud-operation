const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique : true, 
  },

  password: {
    type: String,
    required: true,
  },
});


const admin = mongoose.model("adminUser", adminSchema)

module.exports = admin ; 
