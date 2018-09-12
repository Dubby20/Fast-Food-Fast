  const orders = [{
    orderId: 1,
    userId: 1,
    foodMenu: ['CheeseBurger', 'Pizza with Tomatoes'],
    quantity: 1,
    totalPrice: 2000,
    deliveryAddress: 'Awolowo Road Lagos',
    dateOrdered: new Date(),
    status: 'Completed'

  },
{
  orderId: 2,
    userId: 2,
    foodMenu: ['Seafood Pizza', 'Fried Chicken'],
    quantity: 3,
    totalPrice: 4000,
    deliveryAddress: 'Alfred Rewane Road Lagos',
    dateOrdered: new Date(),
    status: 'Pending'

},
{
  orderId: 3,
    userId: 3,
    foodMenu: ['Sandwich', 'Hot dog'],
    quantity: 2,
    totalPrice: 3000,
    deliveryAddress: 'Ikorodu Road',
    dateOrdered: new Date(),
    status: 'Completed'
}];

export default orders;