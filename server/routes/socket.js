// Require in models
// var express = require('express');
// var router = express.Router();
var User = require('../models/user.js');
var Order = require('../models/order.js');

// Include uuid generator and timestamp generator
const uuid_generator = require('../uuid-generator.js');
const timestamp = require('../timestamp.js');
var order = new Object();

module.exports = function(io) {
  var orders = [];
  io.on('connection', function(socket) {

    socket.on('new_order', function(new_order) {
      //console.log(new_order)
      var date = timestamp.makeTimestamp();
      var uuid = uuid_generator.generateUUID();

      order = new Order({
        fullname: new_order.fullname,
        phone: new_order.phone,
        address: new_order.address,
        zip: new_order.zip,
        orderType: new_order.orderType,
        needby: new_order.needby,
        amount: new_order.amount,
        payment: new_order.payment,
        maintenance: new_order.maintenance,
        message: new_order.message,
        timestampCreated: date,
        uuid: uuid
      })

      order.save(function(err) {
        if (err) { next(err)}
        console.log("SENDING OUT ORDER!!!!!!");
        io.emit('add_order', order);
        //res.status(201).json(uuid).end()
      })

    }) // ENDS new_order

    socket.on('request_orders', function() {
      //Find users in mongoose
      Order.find({}, function(err, users) {
        // var userMap = {};
        //
        // users.forEach(function(user) {
        //   userMap[user._id] = user;
        // });
        io.emit('found_orders', users);
      });

    })// ENDS request_orders

  })
}
