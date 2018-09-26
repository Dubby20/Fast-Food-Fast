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
    pool.query('INSERT INTO orders(user_id, phone_number, address, food_items) VALUES ($1, $2, $3, $4)',
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

  static userOrderHistory(request, response) {
    /**
  * @description gets a user order history

  * @static userOrderHistory
  * @memberof OrderController
  * @param {object} request object
  * @param {object} response object
  *@function userOrderHistory

  * @returns {object} object
  */
    pool.query('SELECT  * FROM orders WHERE user_id = $1', [request.params.id])
    .then((data) => {
      const orders = data.rows;
      if (orders.length === 0) {
        return response.status(404).json({
          status: 'Error',
          message: 'User has no order history'
        });
      }
      return response.status(200).json({
        orders,
        message: 'Successful'
      });
    }).catch(err => response.status(500).json({
      message: err.message
    }));
  }
}


export default OrderController;