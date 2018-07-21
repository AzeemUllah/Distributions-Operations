var express = require('express');
var router = express.Router();

var db = require('./../database/db');

const { check, validationResult, body } = require('express-validator/check');

var fs = require("fs");
var path = require('path');
var json2xls = require('json2xls');

var Moment = require('moment');

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/../views/dependencies.html'));
});

router.get('/get-dependencies', function(req, res, next) {
  db.query('SELECT * FROM dependencies', function(err, results, fields) {
    if (err) throw res.json({status : "error", data: null, error: err});
    if(!err) {
      res.json({status : "ok", data: results, error: null});
    }
  });
});

router.post('/add-dependencies',[
  check('operation_name_call').isLength({ min: 1 }).withMessage('must not be empty'),
  check('operation_name').isLength({ min: 1 }).withMessage('must not be empty'),
  check('integration_status').isLength({ min: 1 }).withMessage('must not be empty'),
  check('comments').isLength({ min: 1 }).withMessage('must not be empty'),
], function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({status: "error", data: null, error: errors.mapped()});
  }else {
    db.query("INSERT INTO `dependencies`(`dependencies_id`, `operation_name_call`, `operation_name`, `integration_status`, `date_added`,`comments`) VALUES (NULL,'"+req.body.operation_name_call+"','"+req.body.operation_name+"','"+req.body.integration_status+"',CURRENT_TIMESTAMP(),'"+req.body.comments+"')", function (err, results, fields) {
      if (err) throw res.json({status: "error", data: null, error: err});
      if (!err) {
        res.json({status: "ok", data: results, error: null});
      }
    });
  }
});

router.post('/update-dependencies',[
  check('operation_name_call').isLength({ min: 1 }).withMessage('must not be empty'),
  check('operation_name').isLength({ min: 1 }).withMessage('must not be empty'),
  check('integration_status').isLength({ min: 1 }).withMessage('must not be empty'),
  check('comments').isLength({ min: 1 }).withMessage('must not be empty'),
  check('id').isLength({ min: 1 }).withMessage('must not be empty')
], function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({status: "error", data: null, error: errors.mapped()});
  }else {
    db.query("UPDATE `dependencies` SET `operation_name_call`='"+req.body.operation_name_call+"', `operation_name`='"+req.body.operation_name+"', `integration_status`='"+req.body.integration_status+"', `date_added`= CURRENT_TIMESTAMP(), `comments`='"+req.body.comments+"' WHERE `dependencies`.`dependencies_id` = " + req.body.id, function (err, results, fields) {
      if (err) throw res.json({status: "error", data: null, error: err});
      if (!err) {
        res.json({status: "ok", data: results, error: null});
      }
    });
  }
});

router.post('/delete-dependencies',[
  check('id').isLength({ min: 1 }).withMessage('must not be empty')
], function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({status: "error", data: null, error: errors.mapped()});
  }else {
    db.query("DELETE FROM `dependencies` WHERE dependencies_id= " + req.body.id, function (err, results, fields) {
      if (err) throw res.json({status: "error", data: null, error: err});
      if (!err) {
        res.json({status: "ok", data: results, error: null});
      }
    });
  }
});

router.get('/get-dependencies-xls', function(req, res, next) {
  db.query('SELECT * FROM dependencies', function(err, results, fields) {
    if (err) throw res.json({status : "error", data: null, error: err});
    if(!err) {
      var obj = results;
      var xls = json2xls(obj);
      var fileName = 'excel/dependencies/dependencies - ' + Moment(new Date()).format('DD-MM-YYYY h-mm-ss') + '.xlsx';
      fs.writeFileSync(fileName, xls, 'binary');
      res.download(path.resolve(fileName), fileName, { flag: 'w' });
    }
  });
});

module.exports = router;
