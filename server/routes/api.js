var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');
var Order = require('../models/order.js');

var order = new Object();

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

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

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

//Created order.create for order route. when submited store all inputs into local database
router.post('/order', function(req, res, next) {
  console.log("PUT DATA: ", req.body);
  var now = new Date();
  order = new Order({
    fullname: req.body.fullname,
    phone: req.body.phone,
    address: req.body.address,
    zip: req.body.zip,
    orderType: req.body.orderType,
    needby: req.body.needby,
    amount: req.body.amount,
    payment: req.body.payment,
    maintenance: req.body.maintenance,
    message: req.body.message
    //timestampCreated: Date.now
  })

  order.save(function(err) {
    if (err) { next(err)}
    res.status(201).end()
  })

  // order.create(new Order
  //   ({ fullname: req.body.fullname }),
  //   ({ phone: req.body.phone }),
  //   ({ address: req.body.address }),
  //   ({ zip: req.body.address }),
  //   ({ orderType: req.body.orderType }),
  //   ({ needby: req.body.needby }),
  //   ({ amount: req.body.amount }),
  //   ({ payment: req.body.payment }),
  //   ({ maintenance: req.body.maintenance }),
  //   ({ message: req.body.message }),
  //   function(err) {
  //   if (err) {
  //     return res.status(500).json({
  //       err: err
  //     });
  //   }
  //   passport.authenticate('local')(req, res, function () {
  //     return res.status(200).json({
  //       status: 'Order successful!'
  //     });
  //   });
  // });
});


module.exports = router;
