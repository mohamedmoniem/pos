const { creatUser, getUsers,getUser ,updateUser, deleteUser ,changePassword } = require("../Services/user.serv")
const { signup ,signin} = require("./user.auth")
//const   {ProtectedRoutes} = require ('../Auth/user.auth')  
//const   {allowTo} = require ('../Auth/user.auth')  

const router = require("express").Router()

router.route("/").post( //ProtectedRoutes,allowTo('admin','user'),
creatUser).get(getUsers);

router
.route("/:id")
.get(getUser)
.put(//ProtectedRoutes,allowTo('admin','user'),
updateUser)
// .delete(deleteUser)

router.patch("/changePassword/:id",changePassword)



  router.post('/signup',signup)   // require it up 
 router.post('/signin',signin)

module.exports = router;


