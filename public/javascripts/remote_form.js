if( RD === undefined ) { var RD = function() { return { }; }; }
RD.remote_form = function( extension ) {
  if ( extension === undefined ) { var extension = {}; }
  var self = $.extend( {
    submit: function( format ) {
      var request_format = '';
      if( format === undefined ) { request_format = ''; };
      if( format === 'json' ) { request_format = '.js'; };
      var url = $(this).attr('action') + request_format;
      var data = $(this).serialize();
      var form = this;
      $.post( url, data, function(response) { $(form).fn('response', response )}, format  );
    },
    response: function( response ) {
    }
  }, extension );
  return self;
};

RD.article_inset = function( extension ) {
  if ( extension === undefined ) { var extension = {}; }
  var self = $.extend( {
    after_submit: function( response ) {
      $(this).hide( 1000 );
      $('.remote_content', this ).html('');
      $(this).parents('#add-article').addClass('inactive');
    }
  }, extension );
  return self;
};
