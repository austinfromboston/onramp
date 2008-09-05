if( RD === undefined ) { var RD = function() { return { }; }; }

RD = ( function() {
  var self = {
    message_display: function() { 
      var display = $('#ajax_message')[0];
      if( display === undefined ) { $('body').append('<div id="ajax_message"></div>') };
      return $('#ajax_message');
    }(),
    clear_messages: function() {
      self.message_display.hide('puff');
      self.message_display.queue( function() { $(this).text(''); $(this).dequeue();} );
    },
    notify: function( message ) {
      self.message_display.text( message );
      if( !self.message_display.is(':visible') ) {
        self.message_display.show();
      } 
      if( self.existing_notice !== undefined ) {
        window.clearTimeout( self.existing_notice );
      }
      self.existing_notice = window.setTimeout( RD.clear_messages, 300 + ( message.length * 50 ) );
    }
  };
  return self;
})();
