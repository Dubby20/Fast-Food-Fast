const phoneNumberRegex = /^(\d{11,15}]*)$/;
const addressRegex = /^[A-Za-z0-9\s\,\''\-]{5,100}$/;

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
      this.errMessage = 'Invalid address details';
    }
  }
  /** @function testForFoodItems
   *  @param {Array}
   *
   * @returns {boolean}
   */

  testForFoodItems(foodItems) {
    foodItems.forEach((item) => {
      if (typeof item.foodId !== 'number' || typeof item.quantity !== 'number' || typeof item.quantity < 1 || typeof item.price !== 'number') {
        this.passing = false;
        this.errMessage = 'Invalid values, FoodItems must contain foodId, quantity and price, quantity must not be less than 1, price must not be less than 500';
      }
    });
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
    this.testForPhoneNumber(orders.phoneNumber);
    this.testForAddress(orders.address);
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