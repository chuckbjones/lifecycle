var _ = require('lodash');
var monk = require('monk');
var customerFixtures = require('./fixtures/customers');
var supertestChai = require('supertest-chai');
var request = supertestChai.request;
var chai = require("chai");
chai.should();
chai.use(supertestChai.httpAsserts);

var app = require('../app');
var db = app.get('db');

describe('CRUD for customers collection', function(){

  describe('GET /gato/customers', function(){

    before(function(done){
      db.get('customers').drop()
        .complete(function() {
          db.get('customers').insert(customerFixtures, done);
        });
    });

    it('respond with json customer list', function(done){
      request(app)
        .get('/gato/customers')
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.length(3);
          _.forEach(res.body, function(s) { s.service.should.equal('gato'); });
          done();
        });
    });
  });

  describe('GET /gato/customer', function(){
    it('respond with 404', function(done){
      request(app)
        .get('/gato/customer/notexist')
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.error.should.equal('customer not found.');
          done();
        });
    });

    it('respond with json customer object', function(done){
      request(app)
        .get('/gato/customer/gato1' )
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.service.should.equal('gato');
          res.body.name.should.equal('Alfred Manager');
          done();
        });
    });
  });

  describe('POST /gato/customer', function(){

    it('respond with 500', function(done){
      request(app)
        .post('/gato/customer')
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.error.should.equal('No customer payload provided.');
          done();
        });
    });

    it('create new customer', function(done){
      var customer = { _id: 'gatonew', name: 'Barry Customer', service: 'gato' };
      request(app)
        .post('/gato/customer')
        .send({ customer: customer })
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.deep.equal(customer);
          done();
        });
    });
  });

  describe('PUT /gato/customer/gato1', function(){

    it('respond with 500', function(done){
      request(app)
        .put('/gato/customer/gato1')
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.error.should.equal('No customer payload provided.');
          done();
        });
    });

    it('update customer', function(done){
      var customer = { name: 'Franky Newname' };
      request(app)
        .put('/gato/customer/gato1')
        .send({ customer: customer })
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.affectedCount.should.equal(1);
          done();
        });
    });
  });

  describe('DELETE /gato/customer/gato1', function(){

    it('respond with 500', function(done){
      request(app)
        .del('/gato/customer/notexist')
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.affectedCount.should.equal(0);
          done();
        });
    });

    it('delete customer', function(done){
      request(app)
        .del('/gato/customer/gato1')
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.affectedCount.should.equal(1);
          done();
        });
    });
  });
});
