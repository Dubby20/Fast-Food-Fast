import orders from '../models/orders';

const allOrders = (request, response) => {
  if (!orders) return response.status(404).send('No order was found');
  return response.json({
    orders,
    message: 'Get all orders is successful'
  });
};

export default { allOrders };