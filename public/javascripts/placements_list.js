//create the global RD object unless it already exists
var RD = RD || {};

//A placements list is a list of content placed in a section
RD.placements_list = function( extension ) {
  var extension = extension || {};
  return $.extend( {
    //initialize this list as a sortable, allowing the options to be overridden by a passed extension
    setup_sortable: function( ext ) {
      var self = this;
      var ext = ext || {};
      var default_options = {
        tolerance: 'intersect',
        placeholder: 'shadow-droppable',
        opacity: .7,
        items: '.content > li',
        containment: '#section-content',
        connectWith: [ ".placements_list" ],
        update: function(ev, ui) { 
          if( $(self).fn('is_receiver', ui.item )) {
            $(self).fn('create_and_save'); 
          }
        }
      };
      $(this).sortable( $.extend( default_options, ext )); 
      
    },

    //get a new version of this list from the server
    refresh: function( ) { 
      $(this).fn('before_refresh');
      var list = this;
      $(".reloadable", this).load( $(this).fn('source_url') + $(this).fn('content_selector'), function() { $(list).fn('after_refresh') } );
    },

    //returns a jquery object containing the list items 
    items: function() {
      return $( $(this).fn('content_selector') + $(this).fn('items_selector') );
    },

    //save the serialized ids to the url targeted by the save_placements_list form
    save: function() {
      var form = $('form.save_placements_list', this );
      if( form.length === 0) { return false; }
      $.post( form.attr('action'), form.serialize() + '&' + $(this).sortable( 'serialize' ), function() { $( '.placements_list:not(#available-items)' ).fn('refresh'); } );
    },

    //create new records for any 'create_placement' forms now in the list, then save the updated ordering
    create_and_save: function() {
      if ($('form.create_placement', this).length === 0 ) { return $(this).fn('save'); }
      $('form.create_placement', this).trigger('submit');
    },

    //store a record of the current items in the dom for use after update
    before_refresh: function() {
      $(this).data('previous_items', $(this).fn('items').not('.updated'));
    },

    //perform an effect to make new additions to the list stand out
    after_refresh: function() {
      var items = $(this).fn('new_items');
      if( items !== undefined ) { $(items).show('puff', {}, 1000 ); }
      $('body').trigger('dom.updated');
    },

    //returns items not present or marked as updated before the last refresh action
    new_items: function() {
      if( $(this).data('previous_items') === undefined ) { return $(this).fn('items'); }
      var existing_ids = $($(this).data('previous_items')).map( function() { return this.id } );;
      if(!existing_ids) { return $(this).fn('items'); }
      return $(this).fn('items').not( '#' + $.makeArray(existing_ids).join(',#') );
      //return $.grep( $(this).fn('items'), function( item ) { return ( $.inArray( item.id, existing_ids ) === -1 ) });
    },

    //the url from which to refresh the list over ajax
    //data-section-id is a required attribute on the OL or UL tag
    source_url: function() {
      return '/sections/' + $(this).attr('data-section-id') + '/edit';
    },

    //the selector to identify the list content
    content_selector: function() {
      return ' #' + $(this).attr('id') + ' .content';
    },

    //the selector to identify the list items
    items_selector: function() {
      return ' li[id^=placement_ids_]';
    },

    //is this list the receiver of a dropped sortable item?
    is_receiver: function(item) {
      return ( $( item ).parents('.ui-sortable').is('#'+$(this).attr('id')));
    },

    //is this list the origin of a dropped sortable item?
    is_origin: function() {
      return ( $( '#' + $(this).attr('id') + ' .ui-sortable-helper').length > 0 );
    }


  }, extension );
};
