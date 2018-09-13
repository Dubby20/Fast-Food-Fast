  const orders = [{
      orderId: 1,
      userId: 1,
      foodMenu: [{
        foodId: 97,
        foodName: 'Cheese Burger',
        quantity: 2
      }],
      totalPrice: 2000,
      deliveryAddress: 'Awolowo Road Lagos',
      dateOrdered: new Date(),
      status: 'Completed'

    },
    {
      orderId: 2,
      userId: 2,
      foodMenu: [{
        foodId: 20,
        foodName: 'Seafood Pizza',
        quantity: 1
      }],
      totalPrice: 4000,
      deliveryAddress: 'Alfred Rewane Road Lagos',
      dateOrdered: new Date(),
      status: 'Pending'
    },
    {
      orderId: 3,
      userId: 3,
      foodMenu: [{
        foodId: 20,
        foodName: 'Sandwich',
        quantity: 3
      }],
      totalPrice: 3000,
      deliveryAddress: 'Ikorodu Road',
      dateOrdered: new Date(),
      status: 'Completed'
    }
  ];

  export default orders;