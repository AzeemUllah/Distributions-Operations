var express = require('express');
var router = express.Router();

var db = require('./../database/db');

const { check, validationResult, body } = require('express-validator/check');

var fs = require("fs");
var path = require('path');
var json2xls = require('json2xls');

var Moment = require('moment');

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/../views/operations.html'));
});

router.get('/get-operations', function(req, res, next) {
    db.query('SELECT * FROM operation', function(err, results, fields) {
    if (err) throw res.json({status : "error", data: null, error: err});
    if(!err) {
      res.json({status : "ok", data: results, error: null});
    }
  });
});

router.post('/add-operation',[
  check('product').isLength({ min: 1 }).withMessage('must not be empty'),
  check('product_type').isLength({ min: 1 }).withMessage('must not be empty'),
  check('service').isLength({ min: 1 }).withMessage('must not be empty'),
  check('operation').isLength({ min: 1 }).withMessage('must not be empty'),
  check('operation_name').isLength({ min: 1 }).withMessage('must not be empty'),
  check('service_status').isLength({ min: 1 }).withMessage('must not be empty'),
  check('deployment').isLength({ min: 1 }).withMessage('must not be empty')
], function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({status: "error", data: null, error: errors.mapped()});
  }else {
    db.query("INSERT INTO `operation`(`operation_id`, `product`, `product_type`, `service`, `operation`, `operation_name`, `service_status`, `deployment`, `date_added`)VALUES (NULL,'" + req.body.product + "','" + req.body.product_type + "','" + req.body.service + "','" + req.body.operation + "','" + req.body.operation_name + "','" + req.body.service_status + "','" + req.body.deployment + "',CURRENT_TIMESTAMP())", function (err, results, fields) {
      if (err) throw res.json({status: "error", data: null, error: err});
      if (!err) {
        res.json({status: "ok", data: results, error: null});
      }
    });
  }
});

router.post('/update-operation',[
  check('product').isLength({ min: 1 }).withMessage('must not be empty'),
  check('product_type').isLength({ min: 1 }).withMessage('must not be empty'),
  check('service').isLength({ min: 1 }).withMessage('must not be empty'),
  check('operation').isLength({ min: 1 }).withMessage('must not be empty'),
  check('operation_name').isLength({ min: 1 }).withMessage('must not be empty'),
  check('service_status').isLength({ min: 1 }).withMessage('must not be empty'),
  check('deployment').isLength({ min: 1 }).withMessage('must not be empty'),
  check('id').isLength({ min: 1 }).withMessage('must not be empty')
], function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({status: "error", data: null, error: errors.mapped()});
  }else {
    db.query("UPDATE `operation` SET `product`='"+req.body.product+"', `product_type`='"+req.body.product_type+"', `service`='"+req.body.service+"', `operation`='"+req.body.operation+"', `operation_name`='"+req.body.operation_name+"', `service_status`='"+req.body.service_status+"', `deployment`='"+req.body.deployment+"', `date_added`=CURRENT_TIMESTAMP() WHERE `operation`.`operation_id` = " + req.body.id, function (err, results, fields) {
      if (err) throw res.json({status: "error", data: null, error: err});
      if (!err) {
        res.json({status: "ok", data: results, error: null});
      }
    });
  }
});

router.post('/delete-operation',[
  check('id').isLength({ min: 1 }).withMessage('must not be empty')
], function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({status: "error", data: null, error: errors.mapped()});
  }else {
    db.query("DELETE FROM `operation` WHERE operation_id= " + req.body.id, function (err, results, fields) {
      if (err) throw res.json({status: "error", data: null, error: err});
      if (!err) {
        res.json({status: "ok", data: results, error: null});
      }
    });
  }
});

router.get('/get-operations-xls', function(req, res, next) {
  db.query("SELECT product as 'Product', product_type as 'Product Type', service as 'Service', operation as 'Operation', operation_name as 'Operation Name', service_status as 'Service Status', deployment as 'Deployment', date_added as 'Last Updated' FROM operation", function(err, results, fields) {
    if (err) throw res.json({status : "error", data: null, error: err});
    if(!err) {
      var obj = results;
      var xls = json2xls(obj);
      var fileName = 'excel/operations/operation - ' + Moment(new Date()).format('DD-MM-YYYY h-mm-ss') + '.xlsx';
      fs.writeFileSync(fileName, xls, 'binary');
      res.download(path.resolve(fileName), fileName, { flag: 'w' });
    }
  });
});

module.exports = router;
