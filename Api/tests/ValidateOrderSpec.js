import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  OrderValidator
} from '../middlewares/ValidateOrders';

const {
  expect
} = chai;

chai.use(chaiHttp);

describe('Validate  place order', () => {
  let orderValidator;
  beforeEach((done) => {
    orderValidator = new OrderValidator();
    done();
  });

  it('should validate the this.testForEmptyStringInput function', (done) => {
    const orders = {
      phoneNumber: '19787564535',
      address: 'Lagos',
      food_items: []
    };
    orderValidator.testForEmptyStringInput(orders);
    expect(orderValidator.errMessage).to.equal(undefined);
    expect(orderValidator.passing).to.equal(true);
    orderValidator.testForEmptyStringInput({
      address: ''
    });
    expect(orderValidator.passing).to.equal(false);
    expect(orderValidator.errMessage).to.equal('Input fields must not be empty');
    done();
  });

  it('should validate the testForPhoneNumber function', (done) => {
    orderValidator.testForPhoneNumber('19787564535');
    expect(orderValidator.passing).to.equal(true);
    expect(orderValidator.errMessage).to.equal(undefined);
    orderValidator.testForPhoneNumber('080578464');
    expect(orderValidator.passing).to.equal(false);
    expect(orderValidator.errMessage).to.equal('Invalid number, number must be at least 11 digits');
    done();
  });

  it('should validate the testForAddress function', (done) => {
    orderValidator.testForAddress('Lagos');
    expect(orderValidator.passing).to.equal(true);
    expect(orderValidator.errMessage).to.equal(undefined);
    orderValidator.testForAddress('lag');
    expect(orderValidator.passing).to.equal(false);
    expect(orderValidator.errMessage).to.equal('Invalid address details');
    done();
  });

  it('should validate the testForFoodItems function', (done) => {
    orderValidator.testForFoodItems([{
      foodId: 1,
      quantity: 4
    }]);
    expect(orderValidator.passing).to.equal(true);
    expect(orderValidator.errMessage).to.equal(undefined);
    orderValidator.testForFoodItems([{
      fodId: '1',
      quantity: '0'
    }]);
    expect(orderValidator.passing).to.equal(false);
    expect(orderValidator.errMessage).to.equal(
      'Invalid values, FoodItems must contain foodId and quantity and both must be numbers'
    );
    done();
  });

  it('should validate the this.resetValid function', (done) => {
    orderValidator.resetValid();
    expect(orderValidator.passing).to.equal(true);
    done();
  });
});