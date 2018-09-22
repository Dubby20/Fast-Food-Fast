import chai from 'chai';
import chaiHttp from 'chai-http';
import pool from '../database/db';
import server from '../server';


const {
  expect
} = chai;

chai.use(chaiHttp);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mzc1NDQ0NzIsImV4cCI6MTUzNzYzMDg3Mn0.cN0AYwvndtmfU_VXhrDbtrTCCaVcWsg75UbNFv9HIzg';
const user = {
  firstname: 'Jacinta',
  lastname: 'Nnadi',
  email: 'jacy@gmail.com',
  password: 'dubby654'
};
const inValidUser = {
  firstname: '',
  lastname: 'Nnadi',
  email: 'jacy@gmail.com',
  password: 'dubby'
};

describe('api/v1/auth/signup', () => {
  beforeEach((done) => {
    pool.query('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *', () => {
      done();
    });
  });
  afterEach((done) => {
    pool.query('DELETE FROM users', () => {
      done();
    });
  });

  describe('User signup', () => {
    it('It Should create user with valid input details', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send(user)
        .end((error, response) => {
          expect(response).to.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('User created successfully');
          expect(response.body.user.firstname).to.equal(user.firstname);
          expect(response.body.user.lastname).to.equal(user.lastname);
          expect(response.body.user.email).to.equal(user.email);
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

    // it('It Should not create user with an existing email', (done) => {
    //   chai.request(server)
    //     .post('/api/v1/auth/signup')
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     .send(user)
    //     .end((error, response) => {
    //       expect(response).to.status(409);
    //       expect(response.body).to.be.an('object');
    //       expect(response.body.message).to.equal('Email already exists');
    //       done();
    //     });
    // });
  });
});