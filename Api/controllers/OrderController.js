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
      return response.status(400).json({
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
      }).catch((err) => {
        return response.status(500).json({
          message: err.message
        });
      });
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
    if (!Number(request.params.id)) {
      return response.status(400).json({
        message: 'The given user id is not a number'
      });
    }
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
      }).catch((err) => {
        return response.status(500).json({
          message: err.message
        });
      });
  }
  /**
     * @description Gets all the orders
     *
    * @static allOrders
     * @param {object} request Request object
     * @param {object} response Response object
     * @memberof OrderController

     * @returns {object} List of all orders array
     */

  static allOrders(request, response) {
    pool.query('SELECT * FROM orders')
      .then((data) => {
        const orders = data.rows;
        if (orders.length === 0) {
          return response.status(404).json({
            status: 'Error',
            message: 'No order yet'
          });
        }
        return response.status(200).json({
          orders,
          message: 'All orders was Successful'
        });
      }).catch((err) => {
        return response.status(500).json({
          message: err.message
        });
      });
  }

  /**
   * @description Gets a specific order by id
   *
   * @static orderId
   * @param {object} request Request Object with the given order id
   * @param {object} response Response object
   * @memberof OrderController
   *
   * @returns {object} orders object or error message if order is not found
   */
  static orderId(request, response) {
    if (!Number(request.params.id)) {
      return response.status(400).json({
        message: 'The given order id is not a number'
      });
    }
    pool.query('SELECT * FROM orders where id = $1', [request.params.id])
      .then((data) => {
        const order = data.rows[0];
        if (!order) {
          return response.status(404).json({
            status: 'Error',
            message: 'The id of the given order was not found'
          });
        }
        return response.status(200).json({
          order,
          message: 'Get a specific order was successful'
        });
      }).catch((err) => {
        return response.status(500).json({
          message: err.message
        });
      });
  }
  /**
   * @description Updates's the status of an order with the given id
   *
   * @static updateStatus
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @memberof OrderController
   *
   * @returns {object} Updated status or error message if order id is not found
   */

  static updateStatus(request, response) {
    const {
      status
    } = request.body;
    if (!status) {
      return response.status(400).json({
        status: 'Error',
        message: 'Status is required'
      });
    }
    if (status !== 'Processing' && status !== 'Cancelled' && status !== 'Complete') {
      return response.json({
        message: 'Invalid status, status must be a string containing Processing, Cancelled or Complete'
      });
    }
    if (!Number(request.params.id)) {
      return response.status(400).json({
        message: 'The status with the given id is not a number'
      });
    }
    pool.query(`UPDATE orders SET status = '${status}' WHERE id = $1 RETURNING *`, [request.params.id])
      .then((data) => {
        const orderStatus = data.rows;
        if (orderStatus.length < 1) {
          return response.status(404).json({
            status: 'Error',
            message: 'The status with the given order id was not found'
          });
        }
        return response.status(200).json({
          orderStatus,
          message: 'Status updated successfully'
        });
      }).catch((err) => {
        return response.status(500).json({
          message: err.message
        });
      });
  }
}


export default OrderController;