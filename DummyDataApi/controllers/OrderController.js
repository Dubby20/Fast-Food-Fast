import orders from '../models/orders';
import food from '../models/food';
import user from '../models/user';
import {
  OrderValidator
} from '../Helpers/ValidateOrders';

/**
 * Creates a new OrderValidator.
 * @class OrderValidator
 */
const orderValidator = new OrderValidator();

class OrderControllers {
  /**
   * Gets all the orders
   * @param {object} request Request object
   * @param {object} response Response object
   * @returns {json} List of all orders array
   * @memberof OrderControllers

   */

  static allOrders(request, response) {
    if (!orders) return response.status(404).send('No order was found');
    return response.status(200).json({
      orders,
      message: 'Get all orders is successful'
    });
  }

  /**
   * Gets a particular order by id
   * @param {object} request Request Object with the given order id
   * @param {object} response Response object
   * @returns {json} orders object or error message if order is not found
   * @memberof OrderControllers
   */

  static getOrderId(request, response) {
    const getId = orders.find(item => item.orderId === parseInt(request.params.id, 10));
    if (!Number(request.params.id)) {
      return response.status(400).json({
        message: 'The given id is not a number'
      });
    }
    if (!getId) {
      return response.status(404).json({
        message: 'The order with the given ID was not found'
      });
    }
    // const foodItemsID = getId.foodItems.map(item => item.foodId);
    // const foodItemsQuantity = getId.foodItems.map(item => item.quantity);
    // const foodItems = foodItemsID.map(id => food.find(item => item.foodId === id));
    // getId.foodItems = foodItems;
    return response.status(200).json({
      getId,
      message: 'Get a specific order is successful'
    });
  }

  /**
   * Adds an order
   * @param {object} request - Request object
   * @param {object} response - Response object
   * @returns {json} Added object
   * @memberof OrderControllers
   */

  static postOrders(request, response) {
    const result = orderValidator.testOrders(request.body);
    if (!result.passing) {
      return response.status(400).json({
        message: result.err
      });
    }
    const addOrders = {
      orderId: orders.length + 1,
      userId: request.body.userId,
      foodItems: request.body.foodItems,
      totalPrice: request.body.totalPrice,
      dateOrdered: new Date(),
      status: request.body.status
    };
    orders.push(addOrders);
    return response.status(201).json({
      addOrders,
      message: 'Orders added successfully'
    });
  }

  /**
   * Updates's the status of an order with the given id
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {json} Updated status or error message if order id is not found
   * @memberof OrderControllers
   */

  static updateStatus(request, response) {
    const orderStatus = orders.find(item => item.orderId === parseInt(request.params.id, 10));
    if (!Number(request.params.id)) {
      return response.status(400).json({
        message: 'The status with the given id is not a number'
      });
    }
    if (!orderStatus) {
      return response.status(404).json({
        message: 'The status with the given order ID is not found'
      });
    }
    const id = orders.indexOf(orderStatus);
    orderStatus.status = request.body.status;
    orders[id] = orderStatus;
    return response.status(200).json({
      orderStatus,
      message: 'Status updated successfully'
    });
  }
}

export default OrderControllers;