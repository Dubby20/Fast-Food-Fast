import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const {
  expect
} = chai;

chai.use(chaiHttp);
const user = {
  firstname: 'Jesse',
  lastname: 'Dana',
  email: 'dana@yahoo.com',
  password: 'andela1',
  isAdmin: true
};
let adminToken;
// = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTE4LCJlbWFpbCI6ImRhbmFAeWFob28uY29tIiwiaWF0IjoxNTM4MDgwOTU5LCJleHAiOjE1MzgxNjczNTl9.MNw-1HMddC_oWf-fqXdhOWqkltPhtjMKNSav9LBh2rU';
describe('/POST menu', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(user)
      .end((error, response) => {
        adminToken = response.body.token;
        done();
      });
  });
  it('it should add a new menu', (done) => {
    const menu = {
      foodName: 'Fried Rice',
      foodImage: 'httpsampbusi.jpg',
      description: 'lorem',
      price: 1000
    };
    chai.request(server)
      .post('/api/v1/menu')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('token', adminToken)
      .send(menu)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Menu added successfully');
        done();
      });
  });

  it('It should return an error if foodName is not provided', (done) => {
    const menu = {
      foodName: '',
      foodImage: 'httpsampbusi.jpg',
      description: 'lorem',
      price: 1000
    };
    chai.request(server)
      .post('/api/v1/menu')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('token', adminToken)
      .send(menu)
      .end((error, response) => {
        expect(response).to.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Input fields must not be empty');
        done();
      });
  });

  it('It should return an error if price is not provided', (done) => {
    const menu2 = {
      foodName: 'Fried Rice',
      foodImage: 'httpsampbusi.jpg',
      description: 'lorem',
      price: ''
    };
    chai.request(server)
      .post('/api/v1/menu')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('token', adminToken)
      .send(menu2)
      .end((error, response) => {
        expect(response).to.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body.message).to.equal('Input fields must not be empty');
        done();
      });
  });
});

describe('/GET menu', () => {
  it('it should get all available menu', (done) => {
    chai.request(server)
      .get('/api/v1/menu')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Successful');
        done();
      });
  });
});