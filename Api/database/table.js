import pool from './db';


pool.query('DROP TABLE IF EXISTS users CASCADE')
.then((data) => {
console.log(data);
}).catch((err) => {
  console.log(err);
});

pool.query(`CREATE TABLE food (
  id serial PRIMARY KEY,
order_id INTEGER NOT NULL,
food_id INTEGER NOT NULL,
quantity INTEGER NOT NULL,
created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
)`).then((data) => {
  console.log(data);
});