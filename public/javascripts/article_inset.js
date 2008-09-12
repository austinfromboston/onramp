if( RD === undefined ) { var RD = function() { return { }; }; }
RD.article_inset = function( extension ) {
  if ( extension === undefined ) { var extension = {}; }
  var self = $.extend( {
    after_submit: function( response ) {
      $(this).hide( 1000 );
      $('.tiny_mce', this).each( function() { tinyMCE.get($(this).attr('id')).remove(); } );
      $('.remote_content', this ).html('');
      $(this).parents('#add-article').addClass('inactive');
    },
    cancel: function( ) {
      $(this).hide(1200).prev('.description').show();
      $('.tiny_mce', this).each( function() { tinyMCE.get($(this).attr('id')).remove(); } );
      $(this).queue( function() { 
        $('.remote-content', this).html('');
        $(this).parents('#add-article').addClass('inactive');
        $(this).dequeue();
      } );
      return false;
    },
    show_form: function() {
      $(this).prev('.description').hide('blind');
      $(this).show('blind', {}, 2000 );
      var inset = this;
      $(inset).queue( function(){ RD.load_wysiwyg(); $(inset).dequeue(); } );
      $('body').trigger('dom.updated');
    },
    edit: function() {
      if( $(this).is(':visible') ) { return $(this).fn('cancel'); }
      var scope = this;
      $( '.remote_content', this).load( $('.edit', this).attr('href'), function() { $(scope).fn('show_form'); } );
      return false;
    },
    new: function() {
      if( $(this).is(':visible') ) { return $(this).fn('cancel'); }
      $(this).parents('#add-article').removeClass('inactive');
      var scope = this;
      $( '.remote_content', this).load( $('#add-article-button').attr('href'), function() { $(scope).fn('show_form'); } );
      return false;
    }
  }, extension );
  return self;
};
