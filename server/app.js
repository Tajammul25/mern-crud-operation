const express = require('express')
const app = express();
const cors = require('cors')
const userRouter = require("./routers/userRoutes")
const adminRouter = require("./routers/adminRoutes")

const middleWare = require("./middleWare/authMiddleWare")

// middle ware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended : true}))


// routes

app.use("/api/v1/users", userRouter)

app.use("/admin" , adminRouter )

module.exports = app;