// import pool from '../database/db';


// class OrderController {
//   static placeOrder(request, response) {
//     const {
//       food_id,
//       quantity,
//       phone_number,
//       address,
//       status
//     } = request.body;
//     pool.query('INSERT INTO orders(user_id, food_id, quantity, phone_number, address, status) VALUES ($1, $2, $3, 4$, $5, $6) RETURNING *',
//   [request.decoded.id, food_id, quantity, phone_number, address, status])
//   .then((data) => {

//   });
//   }
// }


// export default OrderController;