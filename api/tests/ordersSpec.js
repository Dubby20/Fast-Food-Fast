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
});

describe('/POST orders', () => {
  it('it should add a new order', (done) => {
    const order = {
    orderId: 1,
    userId: 1,
    foodMenu: ['CheeseBurger', 'Pizza with Tomatoes'],
    quantity: 1,
    totalPrice: 2000,
    deliveryAddress: 'Awolowo Road Lagos',
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
});


describe('/PUT orders/:id', () => {
  it('it should UPDATE status of a specific order id', (done) => {
    const order = {
      orderId: 4,
      userId: 3,
      foodMenu: 'Fried Chicken',
      quantity: 3,
      totalPrice: 4000,
      deliveryAddress: 'Alfred Rewane Road Lagos',
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

  it('it should not UPDATE status of a specific order id', (done) => {
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