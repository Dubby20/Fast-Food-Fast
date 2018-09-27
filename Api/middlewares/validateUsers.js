const firstnameRegex = /^[A-Za-z]{3,20}$/;
const lastnameRegex = /^[A-Za-z]{3,20}$/;
const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /^[A-Za-z0-9]{6,15}$/;

export class ValidateUserSignup {
  /**
   * @description Validate signup
   *
   * @constructor
   * @param {String} request users
   * @param {Object} response users.firstname...
   *
   * @returns {Object} Object
   */


  constructor() {
    this.passing = true;
    this.errMessage;
  }

  /** @function testForEmptyStringInput
   *  @param {Object}

   * @returns {boolean}
   */

  testForEmptyStringInput(users) {
    let check = Object.values(users);
    check = check.every(data => data !== '');
    if (!check) {
      this.passing = false;
      this.errMessage = 'Input fields must not be empty';
    }
  }

  /** @function testFirstName
     *  @param {string}

     * @returns {boolean}
     */

  testFirstName(firstname) {
    if (!firstnameRegex.test(firstname)) {
      this.passing = false;
      this.errMessage = 'Firstname must contain between 3 and 20 characters only';
    }
  }

  /** @function testLastName
   *  @param {string}

   * @returns {boolean}
   */

  testLastName(lastname) {
    if (!lastnameRegex.test(lastname)) {
      this.passing = false;
      this.errMessage = 'Lastname must contain between 3 and 20 characters only';
    }
  }

  /** @function testEmail
   *  @param {string}

   * @returns {boolean}
   */

  testEmail(email) {
    if (!emailRegex.test(email)) {
      this.passing = false;
      this.errMessage = 'Please enter a valid email';
    }
  }

  /** @function testPassword
   *  @param {string}

   * @returns {boolean}
   */

  testPassword(password) {
    if (!passwordRegex.test(password)) {
      this.passing = false;
      this.errMessage = 'Password must be a minimum of 6 characters and a maximum of 15 characters';
    }
  }

  /** @function resetValid

   *  @returns {boolean}
   */

  resetValid() {
    this.passing = true;
    this.errMessage = '';
  }

  /** @function testUsers
   *  @param {Object}

   * @returns {Object}
   */

  testUsers(users) {
    this.resetValid();
    this.testPassword(users.password);
    this.testLastName(users.lastname);
    this.testFirstName(users.firstname);
    this.testEmail(users.email);
    this.testForEmptyStringInput(users);
    const obj = {
      passing: this.passing,
      err: this.errMessage
    };
    return obj;
  }
}


export default ValidateUserSignup;