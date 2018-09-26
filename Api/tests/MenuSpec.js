import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const {
  expect
} = chai;

chai.use(chaiHttp);

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjM5LCJlbWFpbCI6Implc3NlQHlhaG9vLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTUzNzk5Mjk4NCwiZXhwIjoxNTM4MDc5Mzg0fQ.oyNyYYc-v0iG6kczoPAkxt7ydpah2V7ukXK8TNJJKTs';
describe('/POST menu', () => {
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
          foodName: ''
        };
        chai.request(server)
          .post('/api/v1/menu')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send(menu)
          .end((error, response) => {
            expect(response).to.status(400);
            expect(response.body).to.be.an('object');
            expect(response.body.message).to.equal('Food Name is required');
            done();
          });
        });

        it('It should return an error if price is not provided', (done) => {
          const menu2 = {
            price: ''
          };
          chai.request(server)
            .post('/api/v1/menu')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(menu2)
            .end((error, response) => {
              expect(response).to.status(400);
              expect(response.body).to.be.an('object');
              expect(response.body.message).to.equal('Price is required');
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