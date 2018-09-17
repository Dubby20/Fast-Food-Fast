// const quantityRegex = /^[0-9]+$/;
const totalPriceRegex = /^[0-9]+$/;

// const quantityErrMessage = 'FoodItems must contain quantity and it must only contain numbers';
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
    this.testTotalPrice(orders.totalPrice);
    const obj = {
      passing: this.passing,
      err: this.errMessage
    };
    return obj;
  }
}

export default OrderValidator;