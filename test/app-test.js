var supertestChai = require('supertest-chai');
var request = supertestChai.request;
var chai = require("chai");
chai.should();
chai.use(supertestChai.httpAsserts);

var app = require('../app');

describe('General app tests', function(){

  describe('GET /notexist', function(){
    it('respond with 404', function(done){
      request(app)
        .get('/notexist')
        .end(function (res) {
          res.should.be.json;
          res.should.have.status(404);
          res.body.error.should.equal('Not found.');
          done();
        });
    });
  });

});
