const mongoose = require('mongoose')  
const {Schema,model} = require('mongoose')  
const schema = Schema ({     
   // admin: { type: db.SchemaTypes.ObjectId, ref: "Admin" },
    name:{
    //  ar: {
        type: String,
        required:true,
        trim:true,
        unique:true,
        minlength:[3]
   //   }, 
      // en: { 
      //   type: String,
      //   required:true,
      //   trim:true,
      //   unique:true,
      //   minlength:[3]
      // },
    },
    
    slug: {
    type: String ,
    lowercase:true
   } ,
    cover: { String } , 
    
      // banner: {
      //   ar: String,
      //   en: String,
      // } ,

      // icon: String,
      // stringQuery: String,
      // sort: { type: Number, default: 0 },
      // is_active: { type: Boolean, default: true },
      // is_parent: { type: Boolean, default: false },
      // parent: { type: db.SchemaTypes.ObjectId, ref: "Category" },
      // sub_categories: [{ type: db.SchemaTypes.ObjectId, ref: "Category" }],
      // filters: [{ type: db.SchemaTypes.ObjectId, ref: "Filter" }],
      // brands: [{ type: db.SchemaTypes.ObjectId, ref: "Brand" }],
   },
   { timestamps: true }
)

module.exports=mongoose.model('category',schema)   