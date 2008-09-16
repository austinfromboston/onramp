//initializes the RD object unless it already exists
var RD = RD || {};

//these messaging methods are attached to the global RD object directly
$.extend( RD, ( function() {
  var self = {
    //creates an #ajax-message div if none exists
    //becomes a property which references that element
    message_display: ( function() { 
      var display = $('#ajax_message')[0];
      if( display === undefined ) { $('body').append('<div id="ajax_message"></div>') };
      return $('#ajax_message');
    })(),
    //clears the message div
    clear_messages: function() {
      self.message_display.hide('puff');
      self.message_display.queue( function() { $(this).text(''); $(this).dequeue();} );
    },
    //puts a new message in the message div
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
})());

