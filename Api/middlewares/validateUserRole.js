import pool from '../database/db';

const userRole = (request, response, next) => {
  pool.query('SELECT id FROM users WHERE is_admin= true')
.then((data) => {
const user = data.rows[0];
if (!user) {
  return response.status(400).json({
    status: 'Error',
    message: 'Invalid'
  });
}
if (user.isAdmin !== true) {
  return response.status(401).json({
    message: user.isAdmin
  });
}
next();
});
};

export default userRole;