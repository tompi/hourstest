'use strict';

window.app.filter('sumLine', function() {
    return function(numbers) {
        return _.reduce(numbers, function(memo, num){             
            return memo + parseFloat(num || 0); 
        }, 0);
    };
});
window.app.filter('sumColumns', function() {
    return function(numbers, arrayAttribute, columnIndex) {
        var numbers = _.map(numbers, function(item) {
            return item[arrayAttribute][columnIndex];
        });
        var sum = _.reduce(numbers, function(memo, num){             
            return memo + parseFloat(num || 0); 
        }, 0);
        return sum || 0;
    };
});
window.app.filter('sumTotal', function() {
    return function(billedHours) {
        var sum = 0;
        _.each(billedHours, function(line) {
            _.each(line.hours, function(hours) {
                sum = sum + parseFloat(hours || 0);
            });
        });
        return sum || 0;
    };
});