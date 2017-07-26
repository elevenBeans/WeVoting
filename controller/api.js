
var express = require('express');
var router = express.Router();

// var request = require('request');

var serverConf = require('../serverConfig');
var config = serverConf.devConfig;

var dbhandler = require('./DBhandler');

// console.log('process.env.NODE_ENV in login config::::', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') config = serverConf.prdConfig;

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

/**
 * filter array.
 * @param {array} dataArray The first number.
 * @return {obj} The sum of the two numbers.
 */
function filterOptions(dataArray) {
  return dataArray.map(function(item) {
    delete item['options'];
    return item;
  });
}

router.post('/getPollList', function(req, resp) {
  if (req.body.userName) {
    dbhandler.queryPolls(req.body.userName,req.body.pageSize,req.body.pageNum,
      function(data) {
        resp.send(filterOptions(data));
      },
      function(err) {
      }
    );
  } else { // 查询所有存在的 (不为空的)
    dbhandler.queryPolls({ $exists: true},req.body.pageSize,req.body.pageNum,
      function(data) {
        resp.send(filterOptions(data));
      },
      function(err) {
      }
    );
  }
});

router.post('/getPollByID', function(req, resp) {
  dbhandler.queryPollByID(req.body.pollID,
    function(data) {
      resp.send(data);
    },
    function(err) {
    }
  );
});

router.post('/insertPoll', function(req, resp) {
  dbhandler.insertPoll(req.body,
    function() {
      resp.send({
        'result': true
      });
    }
  );
});

router.post('/upDatePollByID', function(req, resp) {
  dbhandler.upDatePollByID(req.body,
    function() {
      resp.send({
        'result': true
      });
    }
  );
});

module.exports = router;
