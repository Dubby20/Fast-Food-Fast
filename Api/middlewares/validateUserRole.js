import pool from '../database/db';

const userRole = (request, response, next) => {
  pool.query('SELECT id FROM users WHERE role= users.role')
.then((data) => {
const user = data.rows[0];
console.log(user);
if (!user) {
  return response.status(400).json({
    status: 'Error',
    message: 'Invalid'
  });
}
if (user.role !== 'Admin') {
  return response.status(401).json({
    message: 'Unauthorized user'
  });
}
// next();
});
};

export default userRole;