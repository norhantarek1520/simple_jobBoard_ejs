const {connectDb}  = require('../DB_conection/connect_db')
const util = require('util');

class Category {
    constructor(id, title , description ){
        this.id =id, 
        this.title =title , 
        this.description =description ;
    }
    // ===============ALL Getter==============
    getId() {return this.id;}
    getTitle () {return this.title ;}
    getDescription () {return this.description ;}
    //=======================ALL Setters ===============================
    setId(value) {  this.id= value;}
    setTitle (value) {  this.title= value ;}
    setDescription (value) {  this.description= value ;}
     //=====================================CRUDS Operations on categoris ================================================
  static query = util.promisify(connectDb.query).bind(connectDb);

  static async getAll() {
    try {
      const result = await this.query("SELECT * FROM categories");
      // Check if the result is empty
      if (result.length === 0) {
        // If no data is found, you might want to return an empty array or null
        return [];
      }
      // If there is data, return the result
      return result;
    } catch (error) {
      // Log the error for debugging purposes
      console.error(error);
      throw error;
    }
  }
  static async get(id) {
    try {
      const result = await this.query(`select * from categories where id = ${id}`)
      if (result.length == 0) {
        return "no data with this id"
      }
      else return result
    } catch (error) {
      console.log("Can not get data from DB  :  " + error)
    }

  }
  static async addNew(category) {
    try {
      const result = await this.query("INSERT INTO categories set ?", category)
      // Check if the category was inserted successfully
      if (result.affectedRows === 1) {
        console.log('Category inserted successfully!');
        return true;
      } else {
        console.error('Error inserting Category!');
        return false;
      }
    } catch (error) {
      console.log(error)

    }


  }
  static async delete(id) {
    try {
      const result = await this.query(`DELETE FROM categories WHERE  id = ${id};`)
      // Check if the category was deleted successfully
      if (result.affectedRows === 1) {
        console.log('Category deleted successfully!');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }

  }
  static async update(category) {
    try {
      const result = await this.query(`UPDATE categories SET title = ? ,description = ? where  id=? `, [category.title, category.description, category.id])

      if (result.affectedRows === 1) {
        console.log('Category updated successfully!');
        return true;
      } else {
        console.error('Error in updating Category!');
        return false;
      }
    } catch (error) {
      console.log(error)

    }


  }

}


module.exports ={Category}