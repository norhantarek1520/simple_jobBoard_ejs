const express = require('express');
let router = express();

const { admin } = require('../Middlware/admin');
const { CategoryController } = require('../Controller/Category_controller')
// general use 
router.get('/', CategoryController.getAllCategories) // get all categories 
router.get('/:id',  CategoryController.getCategory)  // get one categroy and all the jobs inside it 

// for admin can make all crud operation on categories
router.put('/update/:id', admin, CategoryController.updateCategory) 
router.delete('/delete/:id', admin,  CategoryController.deleteCategory)  

module.exports = router;

