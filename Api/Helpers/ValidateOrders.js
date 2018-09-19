const userIdRegex = /^[0-9]+$/;
const totalPriceRegex = /^[0-9]+$/;
const completedRegex = /^Completed$/;
const pendingRegex = /^Pending$/;
const userIdErrMessage = 'userId must be a number';
const foodItemsErrMessage = 'Invalid values, FoodItems must contain foodId and quantity and both must be numbers';
const totalPriceErrMessage = 'Price must only contain digits and must not be empty';
const statusErrMessage = 'Invalid value, status must be a string containing Pending or Completed';

export class OrderValidator {
  constructor() {
    this.passing = true;
    this.errMessage;
  }

  static checkForNumber(data, regex) {
    return !regex.test(data) || typeof data !== 'number';
  }

  testUserId(userId) {
    if (OrderValidator.checkForNumber(userId, userIdRegex)) {
      this.passing = false;
      this.errMessage = userIdErrMessage;
    }
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

  testForStatus(status) {
    if (status !== 'Completed' && status !== 'Pending') {
      this.passing = false;
      this.errMessage = statusErrMessage;
    }
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
    this.testUserId(orders.userId);
    this.testForFoodItems(orders.foodItems);
    this.testTotalPrice(orders.totalPrice);
    this.testForStatus(orders.status);
    const obj = {
      passing: this.passing,
      err: this.errMessage
    };
    return obj;
  }
}

export default OrderValidator;