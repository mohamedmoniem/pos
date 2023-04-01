const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const schema = mongoose.Schema({

   role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
  },
  isActive: {
      type: Boolean,
      default: true
  },


   name: {
      type: String,
      required:true,
      trim: true, 
      minlength: [3],
  },
  lastName: {
      type: String,
      required:true,
      trim: true, 
      nimlength: [3]
  },

  email: {
      type: String,
      required:true,
      trim: true,
      unique:true,
  },
  phone: {
      type: String,
      required:true,
  },
  password: {
      type: String,
      required:true,
      minlength: [6]
  },
  
  passwordChangeAt: Date,

  image: {
   type:String,
  } ,



},   { timestamps: true }
 )


schema.pre('save',async function(){
    this.password =await bcrypt.hash(this.password,Number(process.env.ROUND))
    console.log(this)
})

schema.pre('findOneAndUpdate',async function(){
    this._update.password =await bcrypt.hash(this._update.password,Number(process.env.ROUND))
    console.log(this)
})



module.exports= mongoose.model('user',schema)