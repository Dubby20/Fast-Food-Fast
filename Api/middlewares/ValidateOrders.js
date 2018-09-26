const phoneNumberRegex = /^([0-9{11, 15}]*)$/;
const addressRegex = /^[A-Za-z0-9]{5,100}$/;

export class OrderValidator {
   /**
 * @description Validate order input
 *
 * @constructor
 * @param {String} request foor order
 * @param {Object} response
 *
 * @returns {Object} Object
 */
  constructor() {
    this.passing = true;
    this.errMessage;
  }
/** @function testForPhoneNumber
   *  @param {number}
   * @returns {boolean}
   */

  testForPhoneNumber(phoneNumber) {
    if (!phoneNumberRegex.test(phoneNumber)) {
      this.passing = false;
      this.errMessage = 'Invalid number, number must be at least 11 digits';
    }
  }
/** @function testForAddress
   *  @param {string}
   *
   * @returns {boolean}
   */

  testForAddress(address) {
    if (!addressRegex.test(address)) {
      this.passing = false;
      this.errMessage = 'Invalid, ';
    }
  }
/** @function testForFoodItems
   *  @param {Array}
   *
   * @returns {boolean}
   */

  testForFoodItems(foodItems) {
    foodItems.forEach((item) => {
      if (typeof item.foodId !== 'number' || typeof item.quantity !== 'number') {
        this.passing = false;
        this.errMessage = 'Invalid values, FoodItems must contain foodId and quantity and both must be numbers';
      }
    });
  }
/** @function testForStatus
   *  @param {string}
   *
   * @returns {boolean}
   */

  testForStatus(status) {
    if (status !== 'New' && status !== 'Processing' && status !== 'Cancelled' && status !== 'Complete') {
      this.passing = false;
      this.errMessage = 'Invalid status, status must be a string containing New, Processing, Cancelled or Complete';
    }
  }

  /** @function resetValid
   *
   * @returns {boolean}
   */
  resetValid() {
    this.passing = true;
    this.errMessage = '';
  }
/** @function testForEmptyStringInput
   *  @param {Object}
   * @returns {boolean}
   */

  testForEmptyStringInput(orders) {
    let check = Object.values(orders);
    check = check.every(data => data !== '');
    if (!check) {
      this.passing = false;
      this.errMessage = 'Input fields must not be empty';
    }
  }

  testOrders(orders) {
    this.resetValid();
    this.testForFoodItems(orders.foodItems);
    this.testForEmptyStringInput(orders);
    const obj = {
      passing: this.passing,
      err: this.errMessage
    };
    return obj;
  }
}

export default OrderValidator;