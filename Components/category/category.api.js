
const router = require('express').Router()   // 1
const subcategoryRoute = require('../subcategory/subCategory.api')

const { getCategories,
    creatCategory,
    getOneCategory,
    updatetOneCategory,
    deletetOneCategory }
    = require('./category.serv')  // 4

const { ProtectedRoutes } = require('../user/user.auth')  // 4
const { allowTo } = require('../user/user.auth')  // 4


// Add routes
router.route('/').post(ProtectedRoutes, allowTo('admin'), creatCategory).get(getCategories)     // 3
router
    .route('/:id')
    .get(getOneCategory)
    .put(ProtectedRoutes, allowTo('admin', 'user'), updatetOneCategory)
    .delete(ProtectedRoutes, allowTo('admin', 'user'), deletetOneCategory)

// merge params
// ( parent + id + child ) , navigate to child route
router.use("/:categoryId/subcategories",subcategoryRoute)

module.exports = router;  // 2
