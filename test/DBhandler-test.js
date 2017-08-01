// var app = require('../index');
// var request = require('supertest')(app);
var DBhandler = require('../controller/DBhandler');

var should = require('should');

var sucCal = function(obj) {
  // console.info('safdasdf:::', obj);
  should.exist(obj);
  obj.should.be.Object();
};
var errCal = function(err) {
  // console.error('error::::',err);
  err.should.be.equal('EXIST_USER');
};

describe('DBhandler operator', function() {
  describe('insertUser', function() {
    it('should excute sucCal', function() {
      DBhandler.insertUser(
        {
          'id': '12121',
          'name': 'libin',
          'email': 'test.ctrip.com'
        },
        function(obj) {
          sucCal(obj);
        },
        function(err) {
          errCal(err);
        }
      );
    });
  });
  describe('insertPoll', function() {
    it('should excute sucCal', function() {
      DBhandler.insertPoll(
        {
          'title': 'testcase',
          'description': 'testcasetestcase',
          'options': [
            {
              option:'option1',count:0,index:0
            },
            {
              option:'option2',count:0,index:1
            },
            {
              option:'option3',count:0,index:2
            }
          ],
          'ownerName': 'libin'
        },
        function(obj) {
          sucCal(obj);
        },
        function(err) {
          errCal(err);
        }
      );
    });
  });
  describe('queryPolls', function() {
    it('should excute sucCal', function() {
      DBhandler.queryPolls(
        'libin', 5, 1,
        function(docs) {
          docs.should.be.Array();
        },
        function(err) {
          should.not.exist(err);
        }
      );
    });
    it('should excute sucCal', function() {
      DBhandler.queryPolls(
        '',
        function(docs) {
          docs.should.be.Array();
        },
        function(err) {
          should.not.exist(err);
        }
      );
    });
  });
  describe('queryPollByID', function() {
    it('should excute sucCal', function() {
      DBhandler.queryPollByID(
        '',
        function(docs) {
          docs.should.be.Array();
        },
        function(err) {
          should.not.exist(err);
        }
      );
    });
  });
  describe('upDatePollByID', function() {
    it('should excute sucCal', function() {
      DBhandler.upDatePollByID(
        {
          'pollID': '',
          'index': 1,
          'voter': 'libin'
        },
        function(docs) {
          should.exist(docs);
        },
        function(err) {
          should.not.exist(err);
        }
      );
    });
  });
});
