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

const menu = {
  foodName: 'Fried Rice',
  foodImage: 'httpsampbusi.jpg',
  description: 'lorem',
  price: 1000
};
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA1LCJlbWFpbCI6ImphY3lubmFAeWFob28uY29tIiwiaXNBZG1pbiI6bnVsbCwiaWF0IjoxNTM4NDU5ODg5LCJleHAiOjE1Mzg2MzI2ODl9.so_lBDtotSbwYuOAT2H6rQDXE8GYDz9gZtnFMqxVfNA';
let adminToken;
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
    chai.request(server)
      .post('/api/v1/menu')
      .set('Content-Type', 'application/json')
      .set('x-access-token', adminToken)
      .send(menu)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Menu added successfully');
        done();
      });
  });

  it('it should return an error if a user is not authenticated', (done) => {
    chai.request(server)
      .post('/api/v1/menu')
      .set('Content-Type', 'application/json')
      .set('x-access-token', '')
      .send(menu)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Unauthorized');
        done();
      });
  });

  it('it should return an error if a user has no access', (done) => {
    chai.request(server)
      .post('/api/v1/menu')
      .set('Content-Type', 'application/json')
      .set('x-access-token', userToken)
      .send(menu)
      .end((error, response) => {
        expect(response).to.have.status(403);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Access denied');
        done();
      });
  });

  it('It should return an error if foodName is not provided', (done) => {
    const inValidMenu = {
      foodName: '',
      foodImage: 'httpsampbusi.jpg',
      description: 'lorem',
      price: 1000
    };
    chai.request(server)
      .post('/api/v1/menu')
      .set('Content-Type', 'application/json')
      .set('x-access-token', adminToken)
      .send(inValidMenu)
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
      .set('x-access-token', adminToken)
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
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Successful');
        done();
      });
  });
});

describe('/EDIT menu', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(user)
      .end((error, response) => {
        adminToken = response.body.token;
        done();
      });
  });
  it('it should edit a menu', (done) => {
    const newMenu = {
      foodName: 'Fried Egg',
      foodImage: 'httpsampbusi.png',
      description: 'lorem',
      price: 800
    };
    chai.request(server)
      .put('/api/v1/menu/10')
      .set('Content-Type', 'application/json')
      .set('x-access-token', adminToken)
      .send(newMenu)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Meal has been edited successfully');
        done();
      });
  });

  it('it should not UPDATE a meal id if it is not a number', (done) => {
    chai.request(server)
      .put('/api/v1/menu/xy')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', adminToken)
      .send(menu)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('The given menu id is not a number');
        done();
      });
  });

  it('it should not UPDATE a meal id that is not available', (done) => {
    chai.request(server)
      .put('/api/v1/menu/2')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', adminToken)
      .send(menu)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('The meal with the given id does not exists');
        done();
      });
  });

  it('it should return an error if it fails', (done) => {
    const errorMenu = {
      foodName: '',
      foodImage: '',
      description: 'lorem',
      price: 800
    };
    chai.request(server)
      .put('/api/v1/menu/2')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', adminToken)
      .send(errorMenu)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});

describe('/DELETE menu', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(user)
      .end((error, response) => {
        adminToken = response.body.token;
        done();
      });
  });
  it('it should delete a menu', (done) => {
    chai.request(server)
      .delete('/api/v1/menu/100')
      .set('Content-Type', 'application/json')
      .set('x-access-token', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Meal has been deleted successfully');
        done();
      });
  });

  it('it should not delete a meal id if it is not a number', (done) => {
    chai.request(server)
      .delete('/api/v1/menu/in')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('The given menu id is not a number');
        done();
      });
  });

  it('it should not DELETE a meal id that is not available', (done) => {
    chai.request(server)
      .delete('/api/v1/menu/4')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', adminToken)
      .send(menu)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('The meal with the given id does not exists');
        done();
      });
  });

  it('it should return an error if it fails', (done) => {
    const errorMenu = {
      foodName: '',
      foodImage: '',
      description: 'lorem',
      price: 800
    };
    chai.request(server)
      .put('/api/v1/menu/2')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('x-access-token', adminToken)
      .send(errorMenu)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});