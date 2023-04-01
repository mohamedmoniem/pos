const router = require('express').Router({mergeParams:true})   
const {
  getproducts,
  creatproduct,
  getproduct,
  updateproduct,
  deleteproduct
} = require('./product.serv')

const { ProtectedRoutes,allowTo } = require('../user/user.auth')


router.route("/").post(ProtectedRoutes, allowTo('user'),creatproduct).get(getproducts);
router
  .route('/:id')
  .get(getproduct)
  .put(ProtectedRoutes, allowTo('admin'), updateproduct)
  .delete(ProtectedRoutes, allowTo('admin'), deleteproduct)

module.exports = router;  
