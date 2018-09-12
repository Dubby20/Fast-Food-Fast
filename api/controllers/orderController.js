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

export default { allOrders, getOrderId };