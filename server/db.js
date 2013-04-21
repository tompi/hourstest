var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://hours:hours@ds047057.mongolab.com:47057/hours');
var Schema = mongoose.Schema,
  ObjectId = mongoose.Schema.Types.ObjectId;

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


exports.Customer = mongoose.model('customers', CustomerSchema);
exports.Project = mongoose.model('projects', ProjectSchema);
exports.Hour = mongoose.model('hours', HourSchema);
