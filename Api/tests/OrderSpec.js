import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const {
  expect
} = chai;
const adminUser = {
  firstname: 'Jesse',
  lastname: 'Dana',
  email: 'jesse@yahoo.com',
  password: 'andela',
  isAdmin: true
};
const user = {
  firstname: 'Jacinta',
  lastname: 'Nnadi',
  email: 'jacy@gmail.com',
  password: 'dubby654'
}
chai.use(chaiHttp);
let orderId;
let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM3LCJlbWFpbCI6ImphY3lAZ21haWwuY29tIiwiaXNBZG1pbiI6bnVsbCwiaWF0IjoxNTM3OTkwNzIyLCJleHAiOjE1MzgwNzcxMjJ9.4ZmAgG0r0PCReeuusTDREu_cMo-LunoF_2hIFay-p50';
let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM5LCJlbWFpbCI6Implc3NlQHlhaG9vLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUzNzk5Mjk4NCwiZXhwIjoxNTM4MDc5Mzg0fQ.oyNyYYc-v0iG6kczoPAkxt7ydpah2V7ukXK8TNJJKTs';
const order = {
  phoneNumber: '08186765436',
  address: 'Ikoyi',
  foodItems: [{
    foodId: 1,
    quantity: 2
  }]
};
describe('/POST orders', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(user)
      .end((error, response) => {
        userToken = response.body.token;
        done();
      });
  });
  it('it should add a new order', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('token', userToken)
      .send(order)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Order placed successfully');
        done();
      });
  });

  it('it should not add a menu if the user is not authenticated', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('token', '')
      .send(order)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Unauthorized');
        done();
      });
  });

  it('it should not place an empty order', (done) => {
    const invalidOrder = {
      phoneNumber: '',
      address: 'Ikoyi',
      foodItems: []
    };
    chai.request(server)
      .post('/api/v1/orders')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('token', userToken)
      .send(invalidOrder)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Input fields must not be empty');
        done();
      });
  });

  it('it should not add a new order if input is not valid', (done) => {
    const order2 = {
      phoneNumber: 1097765,
      address: '',
      foodItems: []
    }
    chai.request(server)
      .post('/api/v1/orders')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('token', userToken)
      .send(order2)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('it should not place an order if the user is not authenticated', (done) => {
    chai.request(server)
      .post('/api/v1/orders')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('token', '')
      .send(order)
      .end((error, response) => {
        expect(response).to.have.status(401);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Unauthorized');
        done();
      });
  });
});

describe('/GET orders', () => {
  // it('it should get user order history', (done) => {
  //   chai.request(server)
  //     .get('/api/v1/users/237/orders')
  //     .set('Content-Type', 'application/json')
  //     .set('Accept', 'application/json')
  //     .set('token', userToken)
  //     .end((error, response) => {
  //       expect(response).to.have.status(200);
  //       expect(response.body.message).to.equal('Successful');
  //       expect(response.body.orders).to.be.an('array');
  //       expect(response.body).to.be.an('object');
  //       done();
  //     });
  // });

  it('it should return an error message if the user id is not a number', (done) => {
    chai.request(server)
      .get('/api/v1/users/ab/orders')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('token', userToken)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('The given user id is not a number');
        expect(response.body).to.be.an('object');
        done();
      });
  });
});

describe('/GET orders', () => {
  it('it should GET all orders', (done) => {
    chai.request(server)
      .get('/api/v1/orders')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('token', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.equal('All orders was Successful');
        expect(response.body).to.be.an('object');
        done();
      });
  });
});

describe('/GET/orders/:id', () => {
  it('it should GET an order by the given id', (done) => {
    chai.request(server)
      .get('/api/v1/orders/81')
      .set('token', adminToken)
      .end((error, response) => {
        orderId = response.body.order.id;
        expect(response).to.have.status(200);
        expect(response.body.message).to.equal('Get a specific order was successful');
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('it should return an error message if the id is not a number', (done) => {
    chai.request(server)
      .get('/api/v1/orders/re')
      .set('token', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('The given order id is not a number');
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('it should return an error message when the given ID is not found', (done) => {
    chai.request(server)
      .get('/api/v1/orders/60')
      .set('token', adminToken)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('The id of the given order was not found');
        expect(response.body).to.be.an('object');
        done();
      });
  });
});


describe('/PUT orders/:id', () => {
  it('it should UPDATE status of a specific order id', (done) => {
    const orderStatus = {
      status: 'Cancelled'
    };
    chai.request(server)
      .put('/api/v1/orders/81')
      .set('content-Type', 'application/json')
      .set('accept', 'application/json')
      .set('token', adminToken)
      .send(orderStatus)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Status updated successfully');
        done();
      });
  });

  it('it should return an error if the status is not given', (done) => {
    const orderStatus = {
      status: ''
    };
    chai.request(server)
      .put('/api/v1/orders/3')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('token', adminToken)
      .send(orderStatus)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Status is required');
        done();
      });
  });

  it('it should not UPDATE status of an order id if it is not a number', (done) => {
    chai.request(server)
      .put('/api/v1/orders/ab')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('token', adminToken)
      .send({
        status: 'Processing'
      })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('The status with the given id is not a number');
        done();
      });
  });

  it('it should not UPDATE status of an order id that is not available', (done) => {
    chai.request(server)
      .put('/api/v1/orders/70')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('token', adminToken)
      .send({
        status: 'Complete'
      })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('The status with the given order id was not found');
        done();
      });
  });
});