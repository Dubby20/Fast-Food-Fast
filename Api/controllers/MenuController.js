import pool from '../database/db';
import {
  MenuValidator
} from '../middlewares/validateMenu';

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
    pool.query('INSERT INTO food_menu (food_name, food_image, description, price, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [foodName, foodImage, description, price, request.decoded.id])
      .then((data) => {
        const menu = data.rows[0];
        return response.status(201).json({
          menu,
          status: 'Success',
          message: 'Menu added successfully'
        });
      }).catch((err) => {
        return response.status(500).json({
          message: err.message
        });
      });
  }
/**
   * @description get all available menu
   *
   * @static get a menu
   * @memberof MenuController
   * @param {object} request The request.
   * @param {object} response The response.
   *@function getMenu

   * @returns {object} response.
   */

  static getMenu(request, response) {
    pool.query('SELECT * FROM food_menu')
      .then((data) => {
        const menu = data.rows;
        if (menu.length === 0) {
          return response.status(404).json({
            message: 'No available menu yet'
          });
        }
        return response.status(200).json({
          menu,
          message: 'Successful'
        });
      }).catch((err) => {
        return response.status(500).json({
          message: err.message
        });
      });
  }
}