const { Category } = require('../Models/Category ')

class CategoryController {

  static getAllCategories = async (req, res, next) => {

    try {
      const categories = await Category.getAll();
      // Handle the case where no categories are found
      if (categories.length === 0) {
        res.status(404).json({ message: 'No categories found' });
      }
      // If categories are found, send them in the response
      res.status(200).json(categories);
    } catch (error) {
      // Log the error for debugging purposes
      console.error(error);
      // Handle the error appropriately, send an error response to the client
      res.status(500).json({ message: 'Internal server error' });
    }


  }
  static getCategory = async (req, res, next) => {
    try {
      const result = await Category.get(req.params.id)

      if (result.length === 0) {
        res.status(404).json({ message: 'No categories found' });
      }
      res.status(200).json(result);
    } catch (error) {

      console.error(error);

      res.status(500).json({ message: 'Internal server error' });
    }


  }
  static createCategory = async (req, res, next) => {
    try {
      const categoryObj = new Category();
      categoryObj.setTitle(req.body.title);
      categoryObj.setId(req.body.id);
      categoryObj.setDescription(req.body.description)

      const result = await Category.addNew(categoryObj)
      if (result === true) res.status(200).json(" Category added  successfully ")
      else res.status(404).json(' Can not add this category')


    } catch (error) {
      res.status(404).json(error)

    }
  }
  static updateCategory = async (req, res, next) => {
    try {
      const oldData = await Category.get(req.params.id)

      const categoryObj = new Category();
      // categoryObj.setId(req.params.id)
      if (req.body.title == null) {
        categoryObj.setTitle(oldData[0].title);
      }
      else {
        categoryObj.setTitle(req.body.title);
      }

      if (req.body.description == null) {
        categoryObj.setDescription(oldData[0].description);
      }
      else {
        categoryObj.setDescription(req.body.description);
      }

      categoryObj.setId(req.params.id)
      const result = await Category.update(categoryObj)
      if (result === true) res.status(200).json(" Category updated  successfully ")
      else res.status(404).json(' Can not update this category')

    } catch (error) {
      res.status(404).json(error)

    }

  }
  static deleteCategory = async (req, res, next) => {
    try {

      const result = await Category.delete(req.params.id)
      if (result === true) res.status(200).json(" Category deleted  successfully ")
      else res.status(404).json(' Can not delete this category')


    } catch (error) {
      res.status(404).json(error)

    }
  }


  static dashboard = async(req, res, next)=>{
    // get all categories in one table 
  }

}
module.exports = { CategoryController }