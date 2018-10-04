const foodNameRegex = /^[A-Za-z '.-]*$/;
const foodImageRegex = /.(jpg|jpeg|png)$/;
const descriptionRegex = /^[A-Za-z ']{3,200}$/;

export class MenuValidator {
  /**
 * @description Validate menu input
 *
 * @constructor
 * @param {String} request food menu
 * @param {Object} response food_menu.foodName...
 *
 * @returns {Object} Object
 */
  constructor() {
    this.passing = true;
    this.errMessage;
  }

  /** @function testFoodName
   *  @param {Object}

   * @returns {boolean}
   */
  testFoodName(foodName) {
    if (!foodNameRegex.test(foodName)) {
      this.passing = false;
      this.errMessage = 'FoodName must be characters';
    }
  }

  /** @function testFoodImage
   *  @param {Object}

   * @returns {boolean}
   */

  testFoodImage(foodImage) {
    if (!foodImageRegex.test(foodImage)) {
      this.passing = false;
      this.errMessage = 'FoodImage url must be jpg, jpeg and png';
    }
  }

  /** @function testDescription
   *  @param {Object}

   * @returns {boolean}
   */
  testDescription(description) {
    if (!descriptionRegex.test(description)) {
      this.passing = false;
      this.errMessage = 'Description must contain between 3 and 200 characters only';
    }
  }

  /** @function testPrice
   *  @param {Object}

   * @returns {boolean}
   */
  testPrice(price) {
    if (typeof price !== 'number' && price < 500) {
      this.passing = false;
      this.errMessage = 'Price must be a number greater than 500';
    }
  }

  /** @function resetValid

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

  testForEmptyStringInput(food_menu) {
    let check = Object.values(food_menu);
    check = check.every(data => data !== '');
    if (!check) {
      this.passing = false;
      this.errMessage = 'Input fields must not be empty';
    }
  }

  /** @function testFoodMenu
   *  @param {Object}

   * @returns {Object}
   */
  testFoodMenu(food_menu) {
    this.resetValid();
    this.testFoodName(food_menu.foodName);
    this.testFoodImage(food_menu.foodImage);
    this.testDescription(food_menu.description);
    this.testPrice(food_menu.price);
    this.testForEmptyStringInput(food_menu);
    const obj = {
      passing: this.passing,
      err: this.errMessage
    };
    return obj;
  }
}

export default MenuValidator;