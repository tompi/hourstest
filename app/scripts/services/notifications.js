/* global $ */

window.app.factory('notifications', function() {
  var me = {};
  me.alert = function(text, type) {
    $.bootstrapGrowl(text, {
      ele: 'body', // which element to append to
      type: type || 'info', // (null, 'info', 'error', 'success')
      offset: {
        from: 'bottom',
        amount: 10
      }, // 'top', or 'bottom'
      align: 'right', // ('left', 'right', or 'center')
      width: 250, // (integer, or 'auto')
      delay: 2000,
      'allow_dismiss': true,
      'stackup_spacing': 10 // spacing between consecutively stacked growls.
    });
  };
  return me;
});