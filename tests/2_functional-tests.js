const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function(done) {
  test('convert 10L: GET request to /api/convert', (done)=>{
    chai
      .request(server)
      .get('/api/convert?input=10L')
      .end((err, res) =>{
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {initNum: 10, initUnit: 'L', returnNum: 2.64172, returnUnit: 'gal', string: '10 litres converts to 2.64172 gallons'})
        done();
      })  
  })
  test('convert 32g(invalid): GET request to /api/convert', (done)=>{
    chai
      .request(server)
      .get('/api/convert?input=32g')
      .end((err, res) =>{
        assert.equal(res.status, 200);
        assert.deepEqual(res.text, 'invalid unit')
        done()
      })  
  })
  test('convert 3/7.2/4kg(invalid): GET request to /api/convert', (done)=>{
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end((err, res) =>{
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number')
        done()
      })  
  })
  test('convert 3/7.2/4kilomegagram(invalid): GET request to /api/convert', (done)=>{
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end((err, res) =>{
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number and unit')
        done()
      })  
  })
  test('convert naked unit on GET request to api/convert', (done)=>{
    chai
      .request(server)
      .get('/api/convert?input=mi')
      .end((err, res) =>{
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {initNum: 1, initUnit: 'mi', returnNum: 1.60934, returnUnit: 'km', string: '1 miles converts to 1.60934 kilometers'})
        done()
      })  
  })
});
