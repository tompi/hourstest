var events = require('events');
var eventEmitter = new events.EventEmitter();

module.exports = {
  emit: eventEmitter.emit,
  on: eventEmitter.on
};

