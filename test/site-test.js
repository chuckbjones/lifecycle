var _ = require('lodash');
var monk = require('monk');
var siteFixtures = require('./fixtures/sites');
var supertestChai = require('supertest-chai');
var request = supertestChai.request;
var chai = require("chai");
chai.should();
chai.use(supertestChai.httpAsserts);

var app = require('../app');
var db = app.get('db');

describe('CRUD for sites collection', function(){

  describe('GET /gato/sites', function(){

    before(function(done){
      db.get('sites').drop()
        .complete(function() {
          db.get('sites').insert(siteFixtures, done);
        });
    });

    it('respond with json site list', function(done){
      request(app)
        .get('/gato/sites')
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

  describe('GET /gato/site', function(){
    it('respond with 404', function(done){
      request(app)
        .get('/gato/site/notexist')
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.error.should.equal('Site not found.');
          done();
        });
    });

    it('respond with json site object', function(done){
      request(app)
        .get('/gato/site/gato1' )
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.service.should.equal('gato');
          res.body.name.should.equal('Decommisioned Gato Site');
          done();
        });
    });
  });

  describe('POST /gato/site', function(){

    it('respond with 500', function(done){
      request(app)
        .post('/gato/site')
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.error.should.equal('No site payload provided.');
          done();
        });
    });

    it('create new site', function(done){
      var site = { _id: 'gatonew', name: 'My New Site', service: 'gato' };
      request(app)
        .post('/gato/site')
        .send({ site: site })
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.deep.equal(site);
          done();
        });
    });
  });

  describe('PUT /gato/site/gato1', function(){

    it('respond with 500', function(done){
      request(app)
        .put('/gato/site/gato1')
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.error.should.equal('No site payload provided.');
          done();
        });
    });

    it('update site', function(done){
      var site = { name: 'My New Site Name' };
      request(app)
        .put('/gato/site/gato1')
        .send({ site: site })
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.affectedCount.should.equal(1);
          done();
        });
    });
  });

  describe('DELETE /gato/site/gato1', function(){

    it('respond with 500', function(done){
      request(app)
        .del('/gato/site/notexist')
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.affectedCount.should.equal(0);
          done();
        });
    });

    it('delete site', function(done){
      request(app)
        .del('/gato/site/gato1')
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
