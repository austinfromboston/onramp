if( RD === undefined ) { var RD = function() { return { }; }; }

RD = ( function() {
  var self = {
    message_display: function() { 
      var display = $('#ajax_message')[0];
      if( display === undefined ) { $('body').append('<div id="ajax_message"></div>') };
      return $('#ajax_message');
    }(),
    clear_messages: function() {
      self.message_display.text('');
    },
    notify: function( message ) {
      self.message_display.text( message ); 
      window.setTimeout( RD.clear_messages, 5000 );
    }
  };
  return self;
})();
