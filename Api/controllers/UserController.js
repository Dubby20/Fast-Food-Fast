import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database/db';
import {
  ValidateUserSignup
} from '../middlewares/validateUsers';


/**
 * Creates a new ValidateUserSignup.
 * @class ValidateUserSignup
 */
const validateSignup = new ValidateUserSignup();
class UserController {
  /**
   * @description creates new user

   * @static signup a user
   * @memberof UserController
   * @param {object} request object
   * @param {object} response object
   *@function signup

   * @returns {object} object
   */

  static signup(request, response) {
    const results = validateSignup.testUsers(request.body);
    if (!results.passing) {
      return response.status(400).json({
        message: results.err
      });
    }
    const {
      firstname,
      lastname,
      email,
      password,
      phoneNumber,
      address
    } = request.body;

    pool.query('SELECT * FROM users WHERE email = $1', [request.body.email])
      .then((result) => {
        const emailExists = result.rows[0];
        if (emailExists) {
          return response.status(409).json({
            status: 'Error',
            message: 'Email already exists'
          });
        }
        /**
         * Hash Password Method
         * @param {string} password
         * @returns {string} returns hashed password
         */
        bcrypt.hash(request.body.password, 10, (error, hash) => {
          pool.query(
              'INSERT INTO users (firstname, lastname, email, password, phone_number, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
              [request.body.firstname, request.body.lastname, request.body.email, hash, request.body.phone_number, request.body.address]
            )
            .then((data) => {
              const user = data.rows[0];
              /**
               * Gnerate Token
               * @param {string} id
               * @param {string} email
               * @returns {string} token
               */
              const token = jwt.sign({
                id: user.id,
                email: user.email
              }, process.env.SECRET, {
                expiresIn: '24h'
              });
              return response.status(201).json({
                token,
                status: 'Success',
                message: 'User created successfully',
                user: {
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email
                }
              });
            }).catch((err) => {
              response.status(501).json({
                message: err.message
              });
            });
        });
      }).catch((err) => {
        response.status(502).json({
          message: err.message
        });
      });
  }
}

export default UserController;