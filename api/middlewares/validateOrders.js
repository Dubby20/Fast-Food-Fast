const quantityRegex = /^[0-9]+$/;
const totalPriceRegex = /^[0-9]+$/;

const quantityErrMessage = 'Quantity must only contain numbers and must not be empty';
const totalPriceErrMessage = 'Price must only contain digits and must not be empty';

export class OrderValidator {
  constructor() {
    this.passing = true;
    this.errMessage;
  }

  static checkForNumber(data, regex) {
    return !regex.test(data) || typeof data !== 'number';
  }

  testQuantity(quantity) {
    if (OrderValidator.checkForNumber(quantity, quantityRegex)) {
      this.passing = false;
      this.errMessage = quantityErrMessage;
    }
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
      this.errMessage = 'Enter valid input data';
    }
  }

  testOrders(orders) {
    this.resetValid();
    this.testForEmptyStringInput(orders);
    this.testQuantity(orders.quantity);
    this.testTotalPrice(orders.totalPrice);
    const obj = {
      passing: this.passing,
      err: this.errMessage
    };
    return obj;
  }
}

export default OrderValidator;