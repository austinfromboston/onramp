var RD = RD || {};

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
    is_receiver: function(item) {
      return ( $( item ).parents('.ui-sortable').is('#'+$(this).attr('id')));
    },
    is_origin: function() {
      return ( $( '#' + $(this).attr('id') + ' .ui-sortable-helper').length > 0 );
    },
    refresh: function( ) { 
      $(this).fn('before_refresh');
      var list = this;
      $(".reloadable", this).load( $(this).fn('source_url') + $(this).fn('content_selector'), function() { $(list).fn('after_refresh') } );
    },
    items: function() {
      return $( $(this).fn('content_selector') + $(this).fn('items_selector') );
    },
    new_items: function() {
      if( $(this).data('previous_items') === undefined ) { return $(this).fn('items'); }
      var existing_ids = $($(this).data('previous_items')).map( function() { return this.id } );;
      if(!existing_ids) { return $(this).fn('items'); }
      return $(this).fn('items').not( '#' + $.makeArray(existing_ids).join(',#') );
      //return $.grep( $(this).fn('items'), function( item ) { return ( $.inArray( item.id, existing_ids ) === -1 ) });
    },
    before_refresh: function() {
      $(this).data('previous_items', $(this).fn('items').not('.updated'));
    },
    after_refresh: function() {
      var items = $(this).fn('new_items');
      if( items !== undefined ) { $(items).show('puff', {}, 1000 ); }
      $('body').trigger('dom.updated');
    },
    create_and_save: function() {
      if ($('form.create_placement', this).length === 0 ) { return $(this).fn('save'); }
      $('form.create_placement', this).trigger('submit');
    },
    save: function() {
      var form = $('form.save_placements_list', this );
      if( form.length === 0) { return false; }
      $.post( form.attr('action'), form.serialize() + '&' + $(this).sortable( 'serialize' ), function() { $( '.placements_list:not(#available-items)' ).fn('refresh'); } );
      
    },
    setup_sortable: function( ext ) {
      var el = this;
      if(ext === undefined ) { var ext = {} };
      var default_options = {
        tolerance: 'intersect',
        placeholder: 'shadow-droppable',
        opacity: .7,
        items: '.content > li',
        containment: '#section-content',
        connectWith: [ ".placements_list" ],
        update: function(ev, ui) { 
          if( $(el).fn('is_receiver', ui.item )) {
            $(el).fn('create_and_save'); 
          }
        }
      };
      $(this).sortable( $.extend( default_options, ext )); 
      
    }
  }, extension );
  return self;
};
