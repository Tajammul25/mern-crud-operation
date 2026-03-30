const User = require('../models/userModel')

// get status
exports.getStatus = async (req , res ) => {
    try {
       const total = await User.countDocuments();
       const active = await User.countDocuments({status : "Active"})
        const inactive = await User.countDocuments({status : "Inactive"})

        res.json({total , active , inactive})
    } catch (error) {
        res.status(500).json({message : "Error fetch statistics ", error : error.message})
    }
}

// Get Users By Search
exports.searchUser = async (req , res) => {
    try {
    
        const query = req.query.term || "";
        const page = parseInt(req.query.page) || 1 ;
        const limit = parseInt(req.query.limit) || 5 ;

        const skip = (page - 1 ) * limit;

        const searchQuery = {
           $or:[

               { name : { $regex : query , $options : "i" }},
               { email : { $regex : query , $options : "i" }},
               { phone : { $regex : query , $options : "i" }},
               { status : { $regex : query , $options : "i" }},    
        ]
    }

    const users = await User.find(searchQuery).sort({createdAt: -1}).skip(skip).limit(limit);

    const total = await User.countDocuments(searchQuery)

    res.json({
        users,
        currentPage : page,
        totalPages : Math.ceil(total / limit),
        totalUsers: total,
    })
    
    } catch (error) {
        res.status(500).json({message: "Error Of Search Quary" , error : error.message })
        
    }
    
}

// getAllUsers

exports.getAllUsers = async (req , res ) => {
try {

    const page = parseInt(req.query.page) || 1 ;
    const limit = parseInt(req.query.limit) || 5 ;

    const skip = (page - 1 ) * limit;

    const users = await User.find().sort({createdAt: -1}).skip(skip).limit(limit);

    const total = await User.countDocuments();

    res.json({
        users,
        currentPage : page,
        totalPages : Math.ceil(total / limit ),
        totalUsers: total,
    })
} catch (error) {
    res.status(500).json({message: "Error of get All Users", error : error.message })
}
    
}

// get Users By Id

exports.getUsersById = async (req , res ) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({message : "user not found "})

        res.json( user )

    } catch (error) {
        res.status(500).json({message: "Error of get Users By Id", error : error.message })
    }
    
}

// Create User 

exports.createUser = async (req , res ) => {
    try {
        
      const {name ,  email , phone , status } = req.body;

      if(!name || !email || !phone ) return res.status(400).json({message : "Name , Email and Phone require"})

      const existingUser = await User.findOne({email})
    
      if(existingUser) return res.status(400).json({message : 'Email Already Register'})

    const user = new User({
        name,
        email,
        phone,
        status : status || "Active"
    })

    await user.save();

    res.json({
        user,
        message : "User Added Successfully"
    })

    } catch (error) {
        res.status(500).json({message: "Error of Create User", error : error.message })
    }
}

// update User

exports.updateUser = async (req, res) => {
  try {

    const { name, email, phone, status } = req.body;

    if (email) {
      const exists = await User.findOne({
        email,
        _id: { $ne: req.params.id }
      });

      if (exists) {
        return res.status(400).json({ message: "Email Already exists" });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, status },
      { new: true, runValidators: true }
    );

    if (!user)  return res.status(404).json({ message: "User NoT Found" });
    

    res.json({user,
        message : "User Updated Successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error Updating User",
      error: error.message
    });
  }
};


// Delete User 

exports.deleteUser = async (req ,  res ) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id) 

        if(!user) return res.status(404).json({message: "user Not Found "})
    
         res.json({message : "User Deleted Successfully " , success : true });

    }
    catch (error) {
        res.status(500).json({
      message: "Error Updating User",
      error: error.message
    });
    };
}