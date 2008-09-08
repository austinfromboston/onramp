//if( RD === undefined ) { var RD = function() { return { }; }; }
RD.placements_list = function( extension ) {
  if ( extension === undefined ) { var extension = {}; }
  var self = $.extend( {
    source_url: function() {
      return '/sections/' + $(this).attr('data-section-id') + '/edit';
    },
    content_selector: function() {
      return ' #' + $(this).attr('id') + ' .content';
    },
    items_selector: function() {
      return ' li[id^=placement_ids_]';
    },
    refresh: function( updated ) { 
      $(this).fn('before_refresh');
      if( updated !== undefined ) { $(this).fn('mark_updated', updated ); }
      var list = this;
      $(".reloadable", this).load( $(this).fn('source_url') + $(this).fn('content_selector'), function() { $(list).fn('after_refresh') } );
    },
    items: function() {
      return $( $(this).fn('content_selector') + $(this).fn('items_selector') );
    },
    mark_updated:  function( id_to_mark ) {
      var existing = $(this).data('previous_items');
      var updated = $.grep($(existing), function(item) { if( item.id !== id_to_mark ) { return true; } } );
      $(this).data('previous_items', updated);
    },
    new_items: function() {
      if( $(this).data('previous_items') === undefined ) { return $(this).fn('items'); }
      var existing_ids = $($(this).data('previous_items')).map( function() { return this.id } );;
      return $.grep( $(this).fn('items'), function( item ) { return ( $.inArray( item.id, existing_ids ) === -1 ) });
    },
    before_refresh: function() {
      //$(this).data('previous_items', $(this).fn('items'));
      var existing = $(this).fn('items');
      var to_save = $.grep($(existing), function(item) { if( !$(item).is('.updated') ) { return true; } } );
      $(this).data('previous_items', to_save );
    },
    after_refresh: function() {
      var items = $(this).fn('new_items');
      if( items !== undefined ) { $(items).show('puff', {}, 1000 ); }
      RD.ui.initialize();
    },
    create_and_save: function() {
      if ($('form.create_placement', this).length === 0 ) { return $(this).fn('save'); }
      $('form.create_placement', this).trigger('submit');
    },
    save: function() {
      var form = $('form.save_placements_list', this );
      if( form.length === 0) { return false; }
      $.post( form.attr('action'), form.serialize() + '&' + $(this).sortable( 'serialize' ), function() { $( '.placements_list:not(#available-items)' ).fn('refresh'); } );
      
    }
  }, extension );
  return self;
};
