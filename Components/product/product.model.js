 const {Schema,model,Types} = require ("mongoose")


const schema = Schema({
 name : { 
    type: String,
    required:true,
    trim:true,
    unique:true,
    minlength:[3] 
   } ,
  
image: String ,
imageCover: String ,

description: {
    type : String,
    required:true,
    trim:true,
    minlength:[10]  
   } ,

   quantity: {
    type : Number,
    required:true,
    default:0
   } ,

   price: {
    type:Number,
    required:true
   } ,

   priceAfterDiscount: {
    type:Number,
    required:true,
   } ,
 
  category : {
    type : Types.ObjectId,    // should be refered
    ref: "category",
    required:true
   } ,

   subCategory : {
    type : Types.ObjectId,    // should be refered
    ref: "subCategory",
    required:true 
   } ,




   slug: { String ,lowercase:true } ,
})


module.exports=model("product",schema)








