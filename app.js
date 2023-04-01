//Handle  typing code error 
process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err)
})

// const requires
const express = require('express')
const { dbConnection } = require('./utils/Configration/dbConnection')
const proError = require('./utils/project.err')
const app = express()

require("dotenv").config({ path: "./utils/Configration/.env" })
const port = process.env.PORT || 5000;

// middleware
app.use(express.json())

app.use('/categories', require('./category/category.api'))
app.use('/categories/:id', require('./category/category.api'))

app.use('/subCategory', require('./subcategory/subCategory.api'))
app.use('/subcategory/:id', require('./subcategory/subCategory.api'))
app.use('/users', require('./Api/user.api'))
app.use('/users/:id', require('./Api/user.api'))
app.use('/users/signup', require('./Api/user.api'))
app.use('/users/signin', require('./Api/user.api'))


// Handle error url
app.all("*", (req, res, next) => {
  // 1)  res.status(404).json({massage:`can't find this url : ${req.originalUrl}`  })     // equal
  // 2)  let err=new Error( `can't find this url : ${req.originalUrl}` )
  //  next(err.message)  // but this is mess without 404 status

  // 3)
  // let err = new proError( `can't find this url : ${req.originalUrl}` , 404  ) 
  // make proError class in new file in utils 
  // require class up 
  next(new proError(`can't find this url : ${req.originalUrl}`, 404))

})

// Handle  global error middleware 
// user.serv.method  & err url
app.use((err, req, res, next) => {
  res.status(400).json({ err, msg: err.message })
})

//db connection
dbConnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// handle prog.  error
process.on('unhandledRejection', (err) => {
  console.log("unhandledRejection", err)
})
