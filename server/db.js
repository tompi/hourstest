(function(module) {
    var mongoose = require('mongoose');
    var config = require('./config');
    var Schema = mongoose.Schema,
        ObjectId = mongoose.Schema.Types.ObjectId;
    var EventEmitter = require('events').EventEmitter;
    var me = new EventEmitter();

    me.mongoDb = mongoose.connect(config.mongoConnectionString);
    me.mongoose = mongoose;

    var CustomerSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        logoUrl: String,
        created: {
            type: Date,
            'default': Date.now
        },
        createdBy: String
    });

    var ProjectSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        validFrom: Date,
        validTo: Date,
        color: String,
        customerId: {
            type: ObjectId,
            required: true
        },
        created: {
            type: Date,
            'default': Date.now
        },
        createdBy: {
            type: String
        }
    });

    var HourSchema = new Schema({
        userId: {
            type: ObjectId,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        text: String,
        hours: {
            type: Number,
            required: true
        },
        projectId: {
            type: ObjectId,
            required: true
        },
        created: {
            type: Date,
            'default': Date.now
        },
        createdBy: String
    });

    CustomerSchema.methods.post = function(customer) {
        me.emit('customerChanged', customer);
    };
    CustomerSchema.methods.put = function(customer) {
        me.emit('customerChanged', customer);
    };
    CustomerSchema.methods.delete = function(customer) {
        me.emit('customerDeleted', customer);
    };
    HourSchema.statics.findByUser = function findByUser(q) {
        return this.find({
            'userId': mongoose.Types.ObjectId(q.userId),
            'date': { '$gte': new Date(q.fromDate), '$lte': new Date(q.toDate + ' 23:59') }
        });
    };

    me.Customer = mongoose.model('customer', CustomerSchema);
    me.Project = mongoose.model('project', ProjectSchema);
    me.Hour = mongoose.model('hour', HourSchema);

    module.exports = me;
})(module);