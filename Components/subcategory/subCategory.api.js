const router = require('express').Router({mergeParams:true})   
const {
  getSubCategories,
  creatSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory
} = require('./SubCategory.serv')

const { ProtectedRoutes } = require('../user/user.auth')
const { allowTo } = require('../user/user.auth')


router.route('/').post(ProtectedRoutes, allowTo('admin'), creatSubCategory).get(getSubCategories)
router
  .route('/:id')
  .get(getSubCategory)
  .put(ProtectedRoutes, allowTo('admin'), updateSubCategory)
  .delete(ProtectedRoutes, allowTo('admin'), deleteSubCategory)

module.exports = router;  
