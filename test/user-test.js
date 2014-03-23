var _ = require('lodash');
var monk = require('monk');
var userFixtures = require('./fixtures/users');
var supertestChai = require('supertest-chai');
var request = supertestChai.request;
var chai = require("chai");
chai.should();
chai.use(supertestChai.httpAsserts);

var app = require('../app');
var db = app.get('db');

describe('CRUD for users collection', function(){

  describe('GET /users', function(){

    before(function(done){
      db.get('users').drop()
        .complete(function() {
          db.get('users').insert(userFixtures, done);
        });
    });

    it('respond with json user list', function(done){
      request(app)
        .get('/users')
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.length(3);
          res.body[0].name.should.equal('Jane Admin');
          res.body[1].name.should.equal('Joe Admin');
          res.body[2].name.should.equal('John Admin');
          done();
        });
    });
  });

  describe('GET /user', function(){
    it('respond with 404', function(done){
      request(app)
        .get('/user/notexist')
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.error.should.equal('user not found.');
          done();
        });
    });

    it('respond with json user object', function(done){
      request(app)
        .get('/user/admin1' )
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.name.should.equal('Joe Admin');
          done();
        });
    });
  });

  describe('POST /user', function(){

    it('respond with 500', function(done){
      request(app)
        .post('/user')
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.error.should.equal('No user payload provided.');
          done();
        });
    });

    it('create new user', function(done){
      var user = { _id: 'gatonew', name: 'Fred Newuser' };
      request(app)
        .post('/user')
        .send({ user: user })
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.deep.equal(user);
          done();
        });
    });
  });

  describe('PUT /user/admin1', function(){

    it('respond with 500', function(done){
      request(app)
        .put('/user/admin1')
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.error.should.equal('No user payload provided.');
          done();
        });
    });

    it('update user', function(done){
      var user = { name: 'Freddy Updateduser' };
      request(app)
        .put('/user/admin1')
        .send({ user: user })
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.affectedCount.should.equal(1);
          done();
        });
    });
  });

  describe('DELETE /user/admin1', function(){

    it('respond with 500', function(done){
      request(app)
        .del('/user/notexist')
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.affectedCount.should.equal(0);
          done();
        });
    });

    it('delete user', function(done){
      request(app)
        .del('/user/admin1')
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
