import chai from 'chai';
import chaiHttp from 'chai-http';

import {
  OrderValidator
} from '../Helpers/ValidateOrders';

const {
  expect
} = chai;

chai.use(chaiHttp);

describe('Validate  orders', () => {
  let ordersValidator;
  beforeEach((done) => {
    ordersValidator = new OrderValidator();
    done();
  });
  it('should validate the this.testUserId function', (done) => {
    ordersValidator.testUserId(1);
    expect(ordersValidator.passing).to.equal(true);
    expect(ordersValidator.errMessage).to.equal(undefined);
    ordersValidator.testUserId('4');
    expect(ordersValidator.passing).to.equal(false);
    expect(ordersValidator.errMessage).to.equal('userId must be a number');
    done();
  });

  it('should validate the this.testForFoodItems function', (done) => {
    ordersValidator.testForFoodItems([{
      foodId: 1,
      quantity: 4
    }]);
    expect(ordersValidator.passing).to.equal(true);
    expect(ordersValidator.errMessage).to.equal(undefined);
    ordersValidator.testForFoodItems([{
      fodId: '1',
      quantity: '3'
    }]);
    expect(ordersValidator.passing).to.equal(false);
    expect(ordersValidator.errMessage).to.equal(
      'Invalid values, FoodItems must contain foodId and quantity and both must be numbers'
    );
    done();
  });

  it('should validate the this.testTotalPrice function', (done) => {
    ordersValidator.testTotalPrice(4000);
    expect(ordersValidator.passing).to.equal(true);
    expect(ordersValidator.errMessage).to.equal(undefined);
    ordersValidator.testTotalPrice('4000');
    expect(ordersValidator.passing).to.equal(false);
    expect(ordersValidator.errMessage).to.equal('Price must only contain digits and must not be empty');
    done();
  });

  it('should validate the this.testForStatus function', (done) => {
    ordersValidator.testForStatus('Completed');
    expect(ordersValidator.passing).to.equal(true);
    expect(ordersValidator.errMessage).to.equal(undefined);
    ordersValidator.testForStatus('Waiting');
    expect(ordersValidator.passing).to.equal(false);
    expect(ordersValidator.errMessage).to.equal('Invalid value, status must be a string containing Pending or Completed');
    done();
  });

  it('should validate the this.resetValid function', (done) => {
    ordersValidator.resetValid();
    expect(ordersValidator.passing).to.equal(true);
    done();
  });
  it('should validate the this.testForEmptyStringInput function', (done) => {
    const orders = {
      userId: 3,
      foodItems: [],
      totalPrice: 4000,
      status: 'Pending'
    };
    ordersValidator.testForEmptyStringInput(orders);
    expect(ordersValidator.errMessage).to.equal(undefined);
    expect(ordersValidator.passing).to.equal(true);
    ordersValidator.testForEmptyStringInput({
      status: ''
    });
    expect(ordersValidator.passing).to.equal(false);
    expect(ordersValidator.errMessage).to.equal('Input fields must not be empty');
    done();
  });
});