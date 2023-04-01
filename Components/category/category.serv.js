const CategoryModel = require ('./category.models')  
const slugify = require ("slugify")       
const asyncHandler = require('express-async-handler')     // Handle error function npm module ..

// create category
exports.creatCategory = asyncHandler( async (req,res)=> {   
const { name}  = req.body;

// await CategoryModel.create(req,res)  or 
// await CategoryModel.insertMany()  or 
// make new instance let category = new categoryModel (req.body)
// category.save()

//let category = new CategoryModel({name})
let category = new CategoryModel(  { name, slug: slugify(name)  }  )
await category.save()
res.status(200).json({category})    
})
 
// get all categories
exports.getCategories = asyncHandler ( async (req,res)=>{
    let categories = await CategoryModel.find({})
    res.status(200).json({categories})  
})


// get specific cat.
exports.getOneCategory =  asyncHandler ( async (req,res)=>{
 const {id}= req.params;                      // get id from url  
 let category =  await CategoryModel.findById(id)
 if(!category){
    return res.status(404).json({message:"category not found"})
  } 
     res.status(200).json({category}) 
 }
)

 // update specific category      (! importat )
 exports.updatetOneCategory = asyncHandler ( async (req,res)=>{
    const {id}= req.params;                      // get id from url  
    const {name}= req.body                       // push data to body 

    let category =  await CategoryModel.findByIdAndUpdate(  id,
      { name, slug: slugify(name) }  ,
     {new:true }                          // new :value after update 
       )
    
    if(!category){
       return res.status(404).json({message:"category not found"})
     } 
        res.status(200).json({category}) 
    }
   
     )

// delete specific category
exports.deletetOneCategory = asyncHandler ( async (req,res)=>{
   const {id}= req.params;                      // get id from url  
   
   let category =  await CategoryModel.findByIdAndDelete(id)
   if(!category){
      return res.status(404).json({message:"category not found"})
    } 
       res.status(200).json({category}) 
   }
     )

