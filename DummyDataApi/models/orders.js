const orders = [{
  orderId: 1,
  userId: 1,
  foodItems: [{
      foodId: 1,
      quantity: 2
    },
    {
      foodId: 2,
      quantity: 4
    }
  ],
  totalPrice: 10000,
  dateOrdered: new Date(),
  status: 'Completed'

},
{
  orderId: 2,
  userId: 2,
  foodItems: [{
    foodId: 2,
    quantity: 1
  }],
  totalPrice: 4000,
  dateOrdered: new Date(),
  status: 'Pending'

}
];

export default orders;