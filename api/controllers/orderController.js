import orders from '../models/orders';

const allOrders = (request, response) => {
  if (!orders) return response.status(404).send('No order was found');
  return response.status(200).json({
    orders,
    message: 'Get all orders is successful'
  });
};

const getOrderId = (request, response) => {
  const getId = orders.find(item => item.orderId === parseInt(request.params.id, 10));
  if (!getId) return response.status(404).send('The order with the given ID is not found');
  return response.status(200).json({
    getId,
    message: 'Get a specific order is successful'
  });
};

const postOrders = (request, response) => {
  const addOrders = {
    orderId: orders.length + 1,
    userId: request.body.userId,
    foodMenu: request.body.foodMenu,
    quantity: request.body.quantity,
    totalPrice: request.body.totalPrice,
    deliveryAddress: request.body.deliveryAddress,
    dateOrdered: new Date(),
    status: request.body.status
  };
  orders.push(addOrders);
  return response.status(201).json({
    addOrders,
    message: 'Orders added successfully'
  });
};

const updateStatus = (request, response) => {
  const orderStatus = orders.find(item => item.orderId === parseInt(request.params.id, 10));
  if (!orderStatus) return response.status(404).send('The status with the given order ID was not found');
  const id = orders.indexOf(orderStatus);
  orderStatus.status = request.body.status;
  orders[id] = orderStatus;
  return response.status(200).json({
    orderStatus,
    message: 'Status updated successfully'
  });
};

export default {
  allOrders,
  getOrderId,
  postOrders,
  updateStatus
};