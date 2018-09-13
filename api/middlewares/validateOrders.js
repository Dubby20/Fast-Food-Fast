import orders from '../models/orders';

const OrderValidator = (request, response, next) => {
  const {
    foodMenu,
    quantity,
    totalPrice,
    deliveryAddress,
    status
  } = request.body;
};

// const foodMenuRegex = /^[A-Za-z]{3,100}$/;
// const quantityRegex = /^[0-9]$/;
// const totalPriceRegex = /^[0-9]$/;
// const deliveryAddressRegex = /^[A-Za-z0-9_]$/;
// const statusRegex = /^[A-Za-z]\S(.*\S)?$/;

// const foodMenuErrMessage = '<strong>Bad Name</strong> - foodMenu names must only contain Alphabets and must not be empty.';
// const quantityErrMessage = '<strong>Bad Quantity</strong> - Quantity must only contain numbers and must not be empty';
// const totalPriceErrMessage = '<strong>Bad Price</strong> - Price must only contain digits and must not be empty';
// const deliveryAddressErrMessage = '<strong>Bad Address</strong> - Delivery address must only contain Alphanumeric characters and must not be empty';
// const statusErrMessage = '<strong>Bad Status</strong> - Status must only contain Alphabets and must not be empty';

// class OrderValidator {
//   constructor() {
//     this.passing = true;
//     this.errMessage = '';
//   }

//   _testFoodMenuName(foodMenu) {
//     if (!foodMenuRegex.test(foodMenu)) {
//       this.passing = false;
//       `this.errMessage ${foodMenuErrMessage}`;
//     }
//   }

//   _testQuantity(quantity) {
//     if (!quantityRegex.test(quantity)) {
//       this.passing = false;
//       `this.errMessage ${quantityErrMessage}`;
//     }
//   }

//   _testTotalPrice(totalPrice) {
//     if (!totalPriceRegex.test(totalPrice)) {
//       this.passing = false;
//       `this.errMessage ${totalPriceErrMessage}`;
//     }
//   }

//   _testDeliveryAddress(deliveryAddress) {
//     if (!deliveryAddressRegex.test(deliveryAddress)) {
//       this.passing = false;
//       `this.errMessage ${deliveryAddressErrMessage}`;
//     }
//   }

//   _testStatus(status) {
//     if (!statusRegex.test(status)) {
//       this.passing = false;
//       `this._errMessage ${statusErrMessage}`;
//     }
//   }

//   _resetValid() {
//     this.passing = true;
//     this.errMessage = '';
//   }

//   testOrders(orders) {
//     this.resetValid();
//     this.testFoodMenuName(orders.foodMenu);
//     this.testQuantity(orders.quantity);
//     this.testTotalPrice(orders.totalPrice);
//     this.testDeliveryAddress(orders.deliveryAddress);
//     this.testStatus(orders.status);
//     const obj = {
//       passing: this.passing,
//       err: this.errMessage
//     };
//     return obj;
//   }
// }

export default OrderValidator;