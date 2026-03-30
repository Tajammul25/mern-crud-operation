const express = require("express")

const { handleSignUpAdminController ,handleSignInAdminController} = require("../controllers/adminController")

const router = express.Router();

router.post("/create" ,  handleSignUpAdminController )

router.post("/login" , handleSignInAdminController )

module.exports = router ;


