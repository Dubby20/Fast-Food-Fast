import jwt from 'jsonwebtoken';

/**
 * Verify Token
 * @param {object} request
 * @param {object} response
 * @param {object} next
 * @returns {object} response object
 */
const verifyToken = (request, response, next) => {
  const {
    token
  } = request.headers || request.body.token;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return response.status(401).json({
          message: 'Authentication failed'
        });
      }
      request.decoded = decoded;
      return next();
    });
  } else {
    return response.status(401).json({
      message: 'Unauthorized'
    });
  }
};

// const adminRole = (request, response, next) => {
//   const admin = {
//     email: 'jacinta@gmail.com',
//     password: 'limelight'
//   };
//   if (request.body.email === admin.email && request.body.password === admin.password) {
//     const authorization = jwt.sign({
//       email: admin.email,
//       expiresIn: 3600
//     }, process.env.SECRET);
//     return response.json({
//       authorization,
//       email: admin.email
//     });
//   }
//     return response.status(401).json({
//       message: 'Unauthorized'
//     });
// };

export default verifyToken;