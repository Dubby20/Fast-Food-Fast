import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

import orders from '../models/orders';

const {
  expect
} = chai;

chai.use(chaiHttp);

describe('/GET orders', () => {
  it('it should GET all orders', (done) => {
    chai.request(server)
      .get('/api/v1/orders')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.equal('Get all orders is successful');
        expect(response.body.orders).to.be.an('array');
        expect(response.body).to.be.an('object');
        done();
      });
  });
});

describe('/GET/orders/:id', () => {
  it('it should GET an order by the given id', (done) => {
    chai.request(server)
      .get('/api/v1/orders/1')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.equal('Get a specific order is successful');
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('it should return an error message if the id is not a number', (done) => {
    chai.request(server)
      .get('/api/v1/orders/re')
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.message).to.equal('The given id is not a number');
        expect(response.body).to.be.an('object');
        done();
      });
  });

  it('it should return an error message when the given ID is not found', (done) => {
    chai.request(server)
      .get('/api/v1/orders/10')
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.message).to.equal('The order with the given ID was not found');
        expect(response.body).to.be.an('object');
        done();
      });
  });
});

describe('/POST orders', () => {
  it('it should add a new order', (done) => {
    const order = {
    orderId: 1,
    userId: 1,
    foodItems: [],
    totalPrice: 2000,
    dateOrdered: new Date(),
    status: 'Completed'
    };
    chai.request(server)
      .post('/api/v1/orders')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(order)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Orders added successfully');
        done();
      });
  });

  it('it should not add a new order if input is not valid', (done) => {
    const order = {
      orderId: 1,
      userId: 1,
      foodItems: [],
      totalPrice: '',
      dateOrdered: new Date(),
      status: 'Completed'
      };
    chai.request(server)
      .post('/api/v1/orders')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(order)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        done();
      });
  });
});


describe('/PUT orders/:id', () => {
  it('it should UPDATE status of a specific order id', (done) => {
    const order = {
      orderId: 4,
      userId: 3,
      foodItems: [],
      totalPrice: 4000,
      dateOrdered: '2018-09-12T22:51:15.609Z',
      status: 'Completed'
  };
    chai.request(server)
      .put('/api/v1/orders/1')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(order)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('Status updated successfully');
        done();
      });
  });

  it('it should not UPDATE status of an order id if it is not a number', (done) => {
    chai.request(server)
      .put('/api/v1/orders/ab')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ status: 'Completed' })
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('The status with the given id is not a number');
        done();
      });
  });

  it('it should not UPDATE status of an order id that is not available', (done) => {
    chai.request(server)
      .put('/api/v1/orders/6')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({ status: 'Completed' })
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message').eql('The status with the given order ID is not found');
        done();
      });
  });
});