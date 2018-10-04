import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  MenuValidator
} from '../middlewares/validateMenu';

const {
  expect
} = chai;

chai.use(chaiHttp);

describe('Validate  add menu', () => {
  let menuValidator;
  beforeEach((done) => {
    menuValidator = new MenuValidator();
    done();
  });

  it('should validate the this.testForEmptyStringInput function', (done) => {
    const food_menu = {
      foodName: 'Fried Rice',
      price: 1000,
      description: 'lorem',
      foodImage: 'httpsampbusi.jpg'
    };
    menuValidator.testForEmptyStringInput(food_menu);
    expect(menuValidator.errMessage).to.equal(undefined);
    expect(menuValidator.passing).to.equal(true);
    menuValidator.testForEmptyStringInput({
      foodName: ''
    });
    expect(menuValidator.passing).to.equal(false);
    expect(menuValidator.errMessage).to.equal('Input fields must not be empty');
    done();
  });

  it('should validate the testFoodName function', (done) => {
    menuValidator.testFoodName('Fried Rice');
    expect(menuValidator.passing).to.equal(true);
    expect(menuValidator.errMessage).to.equal(undefined);
    menuValidator.testFoodName('Fried0f');
    expect(menuValidator.passing).to.equal(false);
    expect(menuValidator.errMessage).to.equal('FoodName must be characters');
    done();
  });

  it('should validate the testFoodImage function', (done) => {
    menuValidator.testFoodImage('httpsampbusi.jpg');
    expect(menuValidator.passing).to.equal(true);
    expect(menuValidator.errMessage).to.equal(undefined);
    menuValidator.testFoodImage('httpsampbusi');
    expect(menuValidator.passing).to.equal(false);
    expect(menuValidator.errMessage).to.equal('FoodImage url must be jpg, jpeg and png');
    done();
  });

  it('should validate the testPrice function', (done) => {
    menuValidator.testPrice(1000);
    expect(menuValidator.passing).to.equal(true);
    expect(menuValidator.errMessage).to.equal(undefined);
    menuValidator.testPrice('400');
    expect(menuValidator.passing).to.equal(false);
    expect(menuValidator.errMessage).to.equal('Price must be a number greater than 500');
    done();
  });

  it('should validate the testDescription function', (done) => {
    menuValidator.testDescription('lorem');
    expect(menuValidator.passing).to.equal(true);
    expect(menuValidator.errMessage).to.equal(undefined);
    menuValidator.testDescription('lore67');
    expect(menuValidator.passing).to.equal(false);
    expect(menuValidator.errMessage).to.equal('Description must contain between 3 and 200 characters only');
    done();
  });

  it('should validate the this.resetValid function', (done) => {
    menuValidator.resetValid();
    expect(menuValidator.passing).to.equal(true);
    done();
  });
});