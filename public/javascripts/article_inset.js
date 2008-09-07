RD.article_inset = function( extension ) {
  if ( extension === undefined ) { var extension = {}; }
  var self = $.extend( {
    after_submit: function( response ) {
      $(this).hide( 1000 );
      $('.remote_content', this ).html('');
      $(this).parents('#add-article').addClass('inactive');
    },
    cancel: function( ) {
      $(this).hide(1200).prev('.description').show();
      $('.remote_content', this).html('');
      $(this).parents('#add-article').addClass('inactive');
    }
  }, extension );
  return self;
};
