var express = require('express');
var router = express.Router();
var passport = require('passport');
var io = require('socket.io');

var User = require('../models/user.js');
var Order = require('../models/order.js');

// Include uuid generator and timestamp generator
const uuid_generator = require('../uuid-generator.js');
const timestamp = require('../timestamp.js');

var order = new Object();

// authenticate Register
router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

// authenticate Login
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

// Logout
router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

// Status
router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});

router.get('/authin', function(req, res, next) {
  var user = { _id: req.user._id, username: req.user.username }
  res.json(user)
})


//Created order.create for order route. when submited store all inputs into local database
router.post('/order', function(req, res, next) {
  var date = timestamp.makeTimestamp();
  var uuid = uuid_generator.generateUUID();

  order = new Order({
    fullname: req.body.fullname,
    username: req.user.username,
    user_id: req.user._id,
    phone: req.body.phone,
    address: req.body.address,
    zip: req.body.zip,
    orderType: req.body.orderType,
    needby: req.body.needby,
    amount: req.body.amount,
    payment: req.body.payment,
    maintenance: req.body.maintenance,
    message: req.body.message,
    timestampCreated: date,
    uuid: uuid
  })

  order.save(function(err) {
    if (err) { next(err)}
    res.status(201).json(uuid).end()
  })
});

//Append the uuid onto the url of the order placed
router.get('/order/:uuid', function(req, res, next) {
  var token = req.params.uuid;
//find the order in the db with thet matches uuid
  Order.findOne({uuid: token},function (err, foundOrder) {
    if (err) console.log('====== ERROR=======', err)
    res.json(foundOrder)

  });
});




module.exports = router;
