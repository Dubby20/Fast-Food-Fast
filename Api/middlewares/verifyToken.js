import jwt from 'jsonwebtoken';

class verifyToken {
  /**
   * Verify Token
   * @param {object} request
   * @param {object} response
   * @param {object} next
   * @returns {object} response object
   */
  static userAuthentication(request, response, next) {
    const {
      token
    } = request.headers || request.body.token;
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (decoded.isAdmin !== true) {
          return response.status(403).json({
            message: 'Authentication failed'
          });
        }
        request.decoded = decoded;
        return next();
      });
    } else {
      response.status(401).json({
        message: 'Unauthorized'
      });
    }
  }
}
export default verifyToken;