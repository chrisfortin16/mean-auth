// order model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Order Schema
var Order = new Schema({
  fullname: String,
  phone: Number,
  address: String,
  zip: Number,
  orderType: String,
  needby: Date,
  amount: String,
  payment: String,
  maintenance: String,
  message: String,
  username: String,
  timestampCreated: String,
  uuid: String
});

module.exports = mongoose.model('Order', Order);
