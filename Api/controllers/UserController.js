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
export default class UserController {
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

    /**
 * Create new user
 * @property {string} request.body.firstname - The firstname of user.
 * @property {string} request.body.lastname - The lastname of user.
 * @property {string} request.body.email - The email of user.
 * @property {string} request.body.password - The password of user.

 * @returns {User}
 */
    const {
      firstname,
      lastname,
      email,
      password,
      isAdmin
    } = request.body;

    pool.query('SELECT * FROM users WHERE email = $1', [email])
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

        bcrypt.hash(password, 10, (error, hash) => {
          pool.query(
              'INSERT INTO users (firstname, lastname, email, password, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
              [firstname, lastname, email, hash, isAdmin]
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
                email: user.email,
                isAdmin: user.isAdmin
              }, process.env.SECRET, {
                expiresIn: '24h'
              });
             return response.status(201).json({
                token,
                status: 'Success',
                message: 'User created successfully'
              });
            }).catch((err) => {
              return response.status(500).json({
                message: err.message
              });
            });
        });
      }).catch((err) => {
        return response.status(500).json({
          message: err.message
        });
      });
  }

  /**
     * @description login a  user

     * @memberof UserController
    * @static login a user
     * @param {object} request object
     * @param {object} response  object
     *
     * @returns {object} object

     */

  static login(request, response) {
    /**
        * @property {string} request.body.email - The email of user.
        * @property {string} request.body.password - The password of user.

        * @returns {User}
        */

    const {
      email,
      password
    } = request.body;

    if (!email) {
      return response.status(204).json({
        status: 'Error',
        message: 'Email is required'
      });
    }
    if (!password) {
      return response.status(204).json({
        status: 'Error',
        message: 'Password is required'
      });
    }
    pool.query('SELECT * FROM users WHERE email = $1', [email])
      .then((data) => {
        const user = data.rows[0];
        if (!user) {
          return response.status(422).json({
            status: 'Error',
            message: 'Invalid login details. Email or password is wrong'
          });
        }

        /**
     * comparePassword
     * @param {string} hashPassword
     * @param {string} password

     * @returns {Boolean} return True or False
     */
        if (!bcrypt.compareSync(password, user.password)) {
          return response.status(422).json({
            status: 'Error',
            message: 'Invalid login details. Email or password is wrong'
          });
        }

        /**
         * Gnerate Token
         * @param {string} id
         * @param {string} email
         * @returns {string} token
         */

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            isAdmin: user.is_admin
          },
          process.env.SECRET, {
            expiresIn: '24h'
          });
        return response.status(200).json({
          token,
          status: 'Success',
          message: 'Successfully signed in'
        });
      }).catch((err) => {
        return response.status(500).json({
          message: err.message
        });
      });
  }
}