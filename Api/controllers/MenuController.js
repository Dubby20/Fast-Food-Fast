import pool from '../database/db';
import { MenuValidator } from '../middlewares/validateMenu';

const validateMenu = new MenuValidator();
export default class MenuController {
  /**
   * @description add a menu
   *
   * @static add a new menu
   * @memberof MenuController
   * @param {object} request The request.
   * @param {object} response The response.
   *@function addMenu

   * @returns {object} response.
   */

  static addMenu(request, response) {
 const results = validateMenu.testFoodMenu(request.body);
    if (!results.passing) {
      return response.status(400).json({
        message: results.err
      });
    }
       /**
 * Create new menu
 * @property {string} request.body.foodName - The name of the food.
 * @property {string} request.body.foodImage - The image of the food.
 * @property {string} request.body.description - The description of the food(optional).
 * @property {number} request.body.price - The price of the food.

 * @returns {Menu}
 */
    const {
      foodName,
      foodImage,
      description,
      price
    } = request.body;
    if (!foodName) {
      return response.status(400).json({
        status: 'Error',
        message: 'Food Name is required'
      });
    }
    if (!price) {
      return response.status(400).json({
        status: 'Error',
        message: 'Price is required'
      });
    }
    pool.query('INSERT INTO food_menu (food_name, food_image, description, price, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [foodName, foodImage, description, price, request.decoded.id])
      .then((data) => {
      const menu = data.rows[0];
      return response.status(201).json({
        menu,
        status: 'Success',
        message: 'Menu added successfully'
      });
    }).catch(err => response.status(500).json({
      message: err.message
    }));
  }
}