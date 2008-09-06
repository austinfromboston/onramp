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
    refresh: function( ) { 
      //$.extend(this,self);
      $(this).fn('before_refresh');
      $(".reloadable", this).load( this.source_url() + this.content_selector(), function() { self.after_refresh.apply(this) } );
    },
    items: function() {
      $.extend(this,self);
      return $( this.content_selector() + this.items_selector() );
    },
    new_items: function() {
      if( $(this).data('previous_items') === undefined ) { return $(this).fn('items'); }
      var existing = $(this).data('previous_items');
      return $.grep( $(this).fn('items'), function( item ) { return ( $(existing).index(item) === -1 ); });
    },
    before_refresh: function() {
      $(this).data('previous_items', $(this).fn('items'));
    },
    after_refresh: function() {
      var items = $(this).fn('new_items');
      if( items !== undefined ) { $(items).show('puff', {}, 1000 ); }
      RD.ui.initialize();
    }
  }, extension );
  return self;
};
