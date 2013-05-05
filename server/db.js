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
      type: String, required: true
    },
    logoUrl: {
      type: String,
    },
    created: {
      type: Date, 'default': Date.now
    },
    createdBy: {
      type: String
    }
  });

  var ProjectSchema = new Schema({
    name: {
      type: String, required: true
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
      type: ObjectId, required: true
    },
    created: {
      type: Date, 'default': Date.now
    },
    createdBy: {
      type: String
    }
  });

  var HourSchema = new Schema({
    day: {
      type: Date, required: true
    },
    hours: {
      type: Number, required: true
    },
    projectId: {
      type: ObjectId, required: true
    },
    created: {
      type: Date, 'default': Date.now
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

  me.Customer = mongoose.model('customer', CustomerSchema);
  me.Project = mongoose.model('project', ProjectSchema);
  me.Hour = mongoose.model('hour', HourSchema);

  module.exports = me;
})(module);
