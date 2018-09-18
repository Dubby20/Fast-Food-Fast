const quantityRegex = /^[0-9]+$/;
const totalPriceRegex = /^[0-9]+$/;
const foodIdRegex = /^[0-9]+$/;
const foodItemsErrMessage = 'Invalid values, FoodItems must contain foodId and quantity and both must be numbers';
const totalPriceErrMessage = 'Price must only contain digits and must not be empty';

export class OrderValidator {
  constructor() {
    this.passing = true;
    this.errMessage;
  }

  static checkForNumber(data, regex) {
    return !regex.test(data) || typeof data !== 'number';
  }

  testTotalPrice(totalPrice) {
    if (OrderValidator.checkForNumber(totalPrice, totalPriceRegex)) {
      this.passing = false;
      this.errMessage = totalPriceErrMessage;
    }
  }

  testForFoodItems(foodItems) {
    foodItems.forEach((item) => {
      if (typeof item.foodId !== 'number' || typeof item.quantity !== 'number') {
        this.passing = false;
        this.errMessage = foodItemsErrMessage;
      }
      // if (OrderValidator.checkForNumber(item.foodId, foodIdRegex){
      //   this.passing = false;
      //   this.errMessage = foodItemsErrMessage;
      // }
    });
  }

  resetValid() {
    this.passing = true;
    this.errMessage = '';
  }

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
    this.testForEmptyStringInput(orders);
    this.testForFoodItems(orders.foodItems);
    this.testTotalPrice(orders.totalPrice);
    const obj = {
      passing: this.passing,
      err: this.errMessage
    };
    return obj;
  }
}

export default OrderValidator;