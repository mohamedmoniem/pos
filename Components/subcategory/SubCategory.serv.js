const SubCategoryModel = require('./subCategory.model')
const slugify = require("slugify")
const asyncHandler = require('express-async-handler')    


// create SubCategory
exports.creatSubCategory = asyncHandler(async (req, res) => {
   const { name, category } = req.body;
   let SubCategory = new SubCategoryModel({ name, slug: slugify(name), category })
   await SubCategory.save()
   res.status(200).json({ SubCategory })
})



// get all  Subcategories 
exports.getSubCategories = asyncHandler(async (req, res) => {
  let filter = {};
  if (req.params.categoryId) {
   filter =  {category: req.params.categoryId }
  }

   let subcategories = await SubCategoryModel.find({ filter }).populate('category' , 'name-_id')
   res.status(200).json({ subcategories })
})


// get specific  subcat.
exports.getSubCategory = asyncHandler(async (req, res) => {
   const { id } = req.params;                      // get id from url  
   let subcategory = await SubCategoryModel.findById(id)
   if (!subcategory) {
      return res.status(404).json({ message: "subcategory not found" })
   }
   res.status(200).json({ subcategory })
}
)


// update specific subcategory      (! importat )
exports.updateSubCategory = asyncHandler(async (req, res) => {
   const { id } = req.params;                      // get id from url  
   const { name } = req.body                       // push data to body 

   let subcategory = await SubCategoryModel.findByIdAndUpdate(id,
      { name, slug: slugify(name) },
      { new: true }                          // new :value after update 
   )

   if (!subcategory) {
      return res.status(404).json({ message: "subcategory not found" })
   }
   res.status(200).json({ subcategory })
}

)

// delete specific  subcategory
exports.deleteSubCategory = asyncHandler(async (req, res) => {
   const { id } = req.params;                      // get id from url  

   let subcategory = await SubCategoryModel.findByIdAndDelete(id)
   if (!subcategory) {
      return res.status(404).json({ message: "subcategory not found" })
   }
   res.status(200).json({ subcategory })
}
)

