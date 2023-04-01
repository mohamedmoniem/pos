const userModel = require("./user.model")
const jwt = require('jsonwebtoken')
const proError = require('../utils/errorFunctions/project.err')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');


// signup for user
exports.signup = asyncHandler(async (req, res, next) => {
  // email exist 
  let isUser = await userModel.findOne({ email: req.body.email })
  if (isUser) return next(new proError("email already regist", 401))
  // insert
  let User = new userModel(req.body)
  await User.save()
  res.status(200).json(User)
})

// Signin 
module.exports.signin = async (req, res, next) => {
   const{email,password}=req.body;

  // check email
  let user = await userModel.findOne({ email: req.body.email })
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new proError("incorrect email or password"), 401)
  }
  // login success
  //  let token =jwt.sign({   payload     } , process.env.JWT_KEY   )
  let token = jwt.sign({ name: user.name, userID: user._id }, process.env.JWT_KEY)
  res.json({ message: "loged in", token })
}


module.exports.ProtectedRoutes = asyncHandler(async (req, res, next) => {
  // 1) token provided or not 
  let token = req.headers.token
  console.log(token)

  if (!token) return next(new proError("token not provided", 401))

  // 2) verifed for token
  let decoded = await jwt.verify(token, process.env.JWT_KEY)
  console.log(decoded)
  console.log(decoded.userID)

  // 3) check this user is still avalibale
  let user = await userModel.findById(decoded.userID)
  if (!user) return next(new proError("user not found", 401))

  // 4) check if password change or not 
  //  let changingPassword = parseInt(user.passwordChangeAt.getTime() / 1000)
  //  console.log(changingPassword);
  //  if (changingPassword > decoded.iat)
  //    return next(new proError("password changed", 401))


  req.user = user
  next()

})


// Authorization
exports.allowTo = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new proError("you are not authorized to acces this route ", 401))

    next()
  })



}






