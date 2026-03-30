const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        require : true, 
        trim: true,
    },
    email: {
        type:String,
        required: true,
        unique : true,
        lowercase : true,
        trim : true,
    
    },
    phone: {
        type:String,
        required: true,
        trim : true    
    },
    status: {
      type:String,
      default : 'Active',
      enum: ["Active", "Inactive"],
        
    },

    createdAt: {
         type: Date,
         default : Date.now,
    },
});

module.exports = mongoose.model("users", userSchema);