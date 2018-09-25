import pool from '../database/db';
import {
  OrderValidator
} from '../middlewares/ValidateOrders';
/**
 * Creates a new OrderValidator.
 * @class OrderValidator
 */
const orderValidator = new OrderValidator();
class OrderController {
  /**
  * @description creates new order

  * @static place an order
  * @memberof OrderController
  * @param {object} request object
  * @param {object} response object
  *@function placeOrder

  * @returns {object} object
  */

  static placeOrder(request, response) {
    const result = orderValidator.testOrders(request.body);
    if (!result.passing) {
      response.status(400).json({
        message: result.err
      });
    }
    const {
      phoneNumber,
      address,
      foodItems
    } = request.body;
    pool.query('INSERT INTO orders(user_id, phone_number, address, food_items) VALUES ($1, $2, $3, $4, $5)',
        [request.decoded.id, phoneNumber, address, JSON.stringify(foodItems)])
      .then((data) => {
        const order = data.rows[0];
        return response.status(201).json({
          order,
          status: 'Success',
          message: 'Order placed successfully'
        });
      }).catch(err => response.status(500).json({
        message: err.message
      }));
  }
}


export default OrderController;