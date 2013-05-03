(function(module) {
  var mongoose = require('mongoose');
  var config = require('./config');
  var Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.Types.ObjectId;
  var EventEmitter = require('events').EventEmitter;
  var me = new EventEmitter();

  mongoose.connect(config.mongoConnectionString);

  var CustomerSchema = new Schema({
    name: {
      type: String,
    },
    logoUrl: {
      type: String,
    },
    created: {
      type: Date
    },
    createdBy: {
      type: String
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
    },
    created: {
      type: Date
    },
    createdBy: {
      type: String
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
    },
    created: {
      type: Date
    },
    createdBy: {
      type: String
    }
  });

  CustomerSchema.methods.post = function(customer) {
    me.emit('customerCreated', customer);
  };
  CustomerSchema.methods.put = function(customer) {
    me.emit('customerChanged', customer);
  };
  CustomerSchema.methods.delete = function(customer) {
    me.emit('customerDeleted', customer);
  };

  me.Customer = mongoose.model('customers', CustomerSchema);
  me.Project = mongoose.model('projects', ProjectSchema);
  me.Hour = mongoose.model('hours', HourSchema);

  module.exports = me;
})(module);
