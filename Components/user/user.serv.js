// CRUD 
const userModel = require("../Models/user.model")
const bcrypt = require('bcrypt');
const proError = require('../utils/project.err')
// 1) const { asyncHandler } = require ("../utils/catchAsync")  // ems7 down
// 2) 
const asyncHandler = require('express-async-handler') 

// 3) Handle error function..     (not worrking well with me )
// function asyncHandler(func){
//   return (req,res,next) =>{
//     func(req,res).catch((err)=>{
//       // res.json(err) 
//         next(err) 
//         // app.js handle error  middleware
//      }  )
//    }
//   } 

// add new User
exports.creatUser =  asyncHandler(async (req,res,next)=>{ 
   // email exist 
   let isUser = await userModel.findOne({email:req.body.email})
   if(isUser) return next(new proError("email already regist",401))
    // insert
   let User = new userModel(req.body)
   await User.save()
   res.status(200).json(User)
   })


// get all user 
exports.getUsers =  asyncHandler(async (req,res)=>{
    let User = await userModel.find({})
    res.status(200).json(User)
   })
 
 // get specific user
   exports.getUser =  asyncHandler(async (req,res,next)=>{
    const {id} = req.params;
    let User = await userModel.findById(id)
   !User && next(new proError(" User not found " , 404 ))
   User && res.status(200).json(User)
   })

   // update specific user 
   exports.updateUser = asyncHandler(async(req,res,next)=> {
    const {id} = req.params;
  let User = await userModel.findByIdAndUpdate(
    id,
    req.body,
    {new: true}
  )
  !User && next(new proError(" user not found", 404 ))
  User && res.status(200).json(User)
   })


    
    // change password 
    exports.changePassword = asyncHandler(async(req,res,next)=> {
      const {id} = req.params;
      req.body.passwordChangeAt = Date.now()   // for token validation
    let User = await userModel.findByIdAndUpdate(
      id,
      req.body,
      {new: true}
    )
    !User && next(new proError(" user not found", 404 ))
    User && res.status(200).json(User)
     })



   // delete user 
  //  exports.deleteUser =factory.deleteOne(userModel)


