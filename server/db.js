(function(module) {
  var mongoose = require('mongoose');
  var db = mongoose.connect('mongodb://hours:hours@ds047057.mongolab.com:47057/hours');
  var Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;
  var EventEmitter = require('events').EventEmitter;
  var me = new EventEmitter();

  var CustomerSchema = new Schema({
    name: {
      type: String,
    },
    logoUrl: {
      type: String,
    }
  });

  var ProjectSchema = new Schema({
    name: {
      type: String,
    },
    validFrom: {
      type: Date
    },
    validTo: {
      type: Date
    },
    color: {
      type: String
    },
    customerId: {
      type: ObjectId
    }
  });

  var HourSchema = new Schema({
    day: {
      type: Date
    },
    hours: {
      type: Number
    },
    projectId: {
      type: ObjectId
    }
  });

  CustomerSchema.methods.post = function(customer) {
    me.emit('customerAdded', customer);
    console.log('emitted event');
  };
  CustomerSchema.methods.put = function(customer) {
    me.emit('customerAdded', customer);
    console.log('emitted event');
  };


  me.Customer = mongoose.model('customers', CustomerSchema);
  me.Project = mongoose.model('projects', ProjectSchema);
  me.Hour = mongoose.model('hours', HourSchema);
  
  module.exports = me;
})(module);
