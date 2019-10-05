var express = require('express');
var router = express.Router();
var User = require('../schema/user.schema');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().then(val => {
    res.send(val);
  }).catch(err => res.status(500).send(err));
});
router.post('/', function(req, res, next) {
  let user = new User(req.body);
  user.save().then(val => {
    res.send(val);
  }).catch(err => res.status(500).send(err));
});
router.post('/multiple', function(req, res, next) {
  User.insertMany(req.body).then(val => {
    res.send(val);
  }).catch(err => res.status(500).send(err));
});
router.get('/percentage/:company', function(req, res, next) {
  User.count({}, function (err, tcount) {
    if (err) {
      res.status(500).send(err);
      return;
    }
    User.count({'company.name': req.params.company}, (err, count) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      let percentage = count/tcount * 100;
      res.send({percentage});
    });
  });
});
module.exports = router;
