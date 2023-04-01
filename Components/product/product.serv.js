const productModel = require('./product.model')
const slugify = require("slugify")
const asyncHandler = require('express-async-handler')

// create product
exports.creatproduct = asyncHandler(async (req, res) => {
    // create slug inside body 
    req.body.slug = slugify(req.body.name)
    let product = new productModel(req.body)
    await product.save()
    res.status(200).json({ product })
})

// get all  products
exports.getproducts = asyncHandler(async (req, res) => {
    let products = await productModel.find({})
    res.status(200).json({ products })
})

// get specific product
exports.getproduct = asyncHandler(async (req, res) => {
    const { id } = req.params;                      // get id from url  
    let product = await productModel.findById(id)
    if (!product) {
        return res.status(404).json({ message: "product not found" })
    }
    res.status(200).json({ product })
})

// update specific product     (! importat )
exports.updateproduct = asyncHandler(async (req, res) => {
    const { id } = req.params;                      // get id from url  
    
    if(req.body.name){
        // creat slug to update
    req.body.slug = slugify(req.body.name)
    }
    let product = await productModel.findByIdAndUpdate(id, req.body,
        { new: true }                      // to return  new :value after update 
    )

    if (!product) {
        return res.status(404).json({ message: "product not found" })
    }
    res.status(200).json({ product })
})

// delete specific product
exports.deleteproduct = asyncHandler(async (req, res) => {
    const { id } = req.params;                      // get id from url  
    let product = await productModel.findByIdAndDelete(id)
    if (!product) {
        return res.status(404).json({ message: "product not found" })
    }
    res.status(200).json({ product })
})

