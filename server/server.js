const dotenv = require('dotenv')
dotenv.config();
const app = require('./app');
const mongoose = require('mongoose')



mongoose.connect(process.env.MONGODB_URI)
.then(()=> {
    console.log("mongoDB connected")
})
.catch((error) => {
    console.log("mongoDB connection Error", error)
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server running on Port ${PORT}`)
})