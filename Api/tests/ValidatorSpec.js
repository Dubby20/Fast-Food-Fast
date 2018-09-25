import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  ValidateUserSignup
} from '../middlewares/validateUsers';

const {
  expect
} = chai;

chai.use(chaiHttp);

describe('Validate  users signup', () => {
  let validateSignup;
  beforeEach((done) => {
    validateSignup = new ValidateUserSignup();
    done();
  });

  it('should validate the this.testForEmptyStringInput function', (done) => {
    const users = {
      firstname: 'Jacinta',
      lastname: 'Nnadi',
      email: 'jacy@gmail.com',
      password: 'password678'
    };
    validateSignup.testForEmptyStringInput(users);
    expect(validateSignup.errMessage).to.equal(undefined);
    expect(validateSignup.passing).to.equal(true);
    validateSignup.testForEmptyStringInput({
      firstname: ''
    });
    expect(validateSignup.passing).to.equal(false);
    expect(validateSignup.errMessage).to.equal('Input fields must not be empty');
    done();
  });

  it('should validate the testFirstName function', (done) => {
    validateSignup.testFirstName('Jacinta');
    expect(validateSignup.passing).to.equal(true);
    expect(validateSignup.errMessage).to.equal(undefined);
    validateSignup.testFirstName('Jacy0984');
    expect(validateSignup.passing).to.equal(false);
    expect(validateSignup.errMessage).to.equal('Firstname must contain between 3 and 20 characters only');
    done();
  });

  it('should validate the testLastName function', (done) => {
    validateSignup.testLastName('Nnadi');
    expect(validateSignup.passing).to.equal(true);
    expect(validateSignup.errMessage).to.equal(undefined);
    validateSignup.testLastName('Nnadi0984');
    expect(validateSignup.passing).to.equal(false);
    expect(validateSignup.errMessage).to.equal('Lastname must contain between 3 and 20 characters only');
    done();
  });

  it('should validate the testEmail function', (done) => {
    validateSignup.testEmail('jacy@gmail.com');
    expect(validateSignup.passing).to.equal(true);
    expect(validateSignup.errMessage).to.equal(undefined);
    validateSignup.testEmail('jacy.com');
    expect(validateSignup.passing).to.equal(false);
    expect(validateSignup.errMessage).to.equal('Please enter a valid email');
    done();
  });

  it('should validate the testPassword function', (done) => {
    validateSignup.testPassword('password678');
    expect(validateSignup.passing).to.equal(true);
    expect(validateSignup.errMessage).to.equal(undefined);
    validateSignup.testPassword('pass');
    expect(validateSignup.passing).to.equal(false);
    expect(validateSignup.errMessage).to.equal('Password must be a minimum of 6 characters and a maximum of 15 characters');
    done();
  });

  it('should validate the this.resetValid function', (done) => {
    validateSignup.resetValid();
    expect(validateSignup.passing).to.equal(true);
    done();
  });
});