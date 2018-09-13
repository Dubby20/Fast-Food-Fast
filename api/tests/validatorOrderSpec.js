import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

import {
  OrderValidator
} from '../middlewares/validateOrders';

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
  it('should validate the this.testQuantity function', (done) => {
    ordersValidator.testQuantity(10);
    expect(ordersValidator.passing).to.equal(true);
    expect(ordersValidator.errMessage).to.equal(undefined);
    ordersValidator.testQuantity('4000');
    expect(ordersValidator.passing).to.equal(false);
    expect(ordersValidator.errMessage).to.equal('Quantity must only contain numbers and must not be empty');
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
  it('should validate the this.resetValid function', (done) => {
    ordersValidator.resetValid();
    expect(ordersValidator.passing).to.equal(true);
    done();
  });
  it('should validate the this.testForEmptyStringInput function', (done) => {
    const orders = {
      userId: 3,
      foodMenu: [],
      quantity: 2,
      totalPrice: 4000,
      deliveryAddress: 'Alfred Rewane Road Lagos',
      status: 'Pending'
    };
    ordersValidator.testForEmptyStringInput(orders);
    expect(ordersValidator.errMessage).to.equal(undefined);
    expect(ordersValidator.passing).to.equal(true);
    ordersValidator.testForEmptyStringInput({
      quantity: ''
    });
    expect(ordersValidator.passing).to.equal(false);
    expect(ordersValidator.errMessage).to.equal('Enter valid input data');
    done();
  });
});