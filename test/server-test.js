var app = require('../index');
var request = require('supertest')(app);
var should = require("should"); 

describe('ServerAPI', function() {
    describe('getPollList', function() {
        it('should return an Array', function(done) {
            request.post('/api/getPollList')
            .send({'pageSize': 5, 'pageNum':1 })
            .expect(200, function(err, response) {
                should.not.exist(err);
                should.exist(response);
                response.body.should.be.Array();
                done();
            });
        });
    });
    describe('getPollByID', function() {
        it('should return an Array', function(done) {
            request.post('/api/getPollByID')
            .send({pollID:"1494907457596"})
            .expect(200, function(err, response) {
                should.not.exist(err);
                should.exist(response);
                response.body.should.be.Array();
                done();
            });
        });
    });
    describe('insertPoll', function() {
        it('should return an obj', function(done) {
            request.post('/api/insertPoll')
            .send({
            	description:"asdf",
            	options:[{
            		option: "asdf",
            		count: 0,
            		index: 0
            	}, {
            		option: "sadf",
            		count: 0,
            		index: 1
            	}],
				ownerName: "elevenBeans",
				title:"asdf",
				voterList:[]
			})
            .expect(200, function(err, response) {
                should.not.exist(err);
                should.exist(response);
                response.body.should.be.Object();
                response.body.result.should.be.Boolean();
                done();
            });
        });
    });
    describe('upDatePollByID', function() {
        it('should return a obj', function(done) {
            request.post('/api/upDatePollByID')
            .send({
		        'pollID': '1494907457596',
		        'index': 0,
		        'voter': 'unit test'
            })
            .expect(200, function(err, response) {
                should.not.exist(err);
                should.exist(response);
                response.body.should.be.Object();
                response.body.result.should.be.Boolean();
                done();
            });
        });
    });
});

describe('ServerView', function() {
    describe('getNewPage', function() {
        it('should return new page', function(done) {
            request.get('/new')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200, function(err, resp) {
                should.not.exist(err);
                should.exist(resp);
                done();
            });
        });
    });
    describe('getListPage', function() {
        it('should return list page', function(done) {
            request.get('/list')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200, function(err, response) {
                should.not.exist(err);
                should.exist(response);
                done();
            });
        });
    });
    describe('getDetailPage', function() {
        it('should return detail page', function(done) {
            request.get('/detail')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200, function(err, response) {
                should.not.exist(err);
                should.exist(response);
                done();
            });
        });
    });
    describe('getHomePage', function() {
        it('should return home page', function(done) {
            request.get('/')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200, function(err, response) {
                should.not.exist(err);
                should.exist(response);
                done();
            });
        });
    });
});