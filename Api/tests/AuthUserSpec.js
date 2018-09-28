import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import pool from '../database/db';


const {
  expect
} = chai;

chai.use(chaiHttp);

const user2 = {
  firstname: 'Dubby',
  lastname: 'Alex',
  email: 'duby@yahoo.com',
  password: 'password'

};
const inValidUser = {
  firstname: 'ja12',
  lastname: 'Nnadi',
  email: 'jacgmail.om',
  password: 'dubby'
};

describe('User', () => {
  before((done) => {
    pool.query(('DELETE from users where email = \'duby@yahoo.com\''))
      .then(() => {
        done();
      }).catch(() => done());
  });

  describe('User signup', () => {
    it('It Should create user with valid input details', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(user2)
        .end((error, response) => {
          expect(response).to.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('User created successfully');
          expect(response.body).to.have.property('token');
          expect(response.body.token).to.be.a('string');
          done();
        });
    });

    it('It Should not create a user with Invalid input details', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(inValidUser)
        .end((error, response) => {
          expect(response).to.status(400);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('It Should not create user with an existing email', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(user2)
        .end((error, response) => {
          expect(response).to.status(409);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Email already exists');
          done();
        });
    });
  });


  describe('User login', () => {
    it('It should login a user with a valid input details', (done) => {
      const userLogin = {
        email: 'duby@yahoo.com',
        password: 'password'
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(userLogin)
        .end((error, response) => {
          expect(response).to.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Successfully signed in');
          expect(response.body).to.have.property('token');
          expect(response.body.token).to.be.a('string');
          done();
        });
    });

    it('It should not login a user with Invalid email details', (done) => {
      const userLogin2 = {
        email: 'jay7@gmail.com',
        password: 'password'
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(userLogin2)
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Invalid login details. Email or password is wrong');
          done();
        });
    });

    it('It should not login a user with Invalid password details', (done) => {
      const userLogin3 = {
        email: 'duby@yahoo.com',
        password: 'dubby'
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(userLogin3)
        .end((error, response) => {
          expect(response).to.status(422);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Invalid login details. Email or password is wrong');
          done();
        });
    });

    it('It should not login a user when the email is not given or invalid', (done) => {
      const userLogin4 = {
        email: '',
        password: 'dubby654'
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(userLogin4)
        .end((error, response) => {
          expect(response).to.status(204);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Email is required');
          done();
        });
    });

    it('It should not login a user when the password is not given or invalid', (done) => {
      const userLogin5 = {
        email: 'jay7@gmail.com',
        password: ''
      };
      chai.request(server)
        .post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(userLogin5)
        .end((error, response) => {
          expect(response).to.status(204);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('Password is required');
          done();
        });
    });
  });
});