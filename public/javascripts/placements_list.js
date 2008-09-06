RD.placements_list = function( extension ) {
  if ( extension === undefined ) { var extension = {}; }
  var self = $.extend( {
    source_url: function() {
      return '/sections/' + $(this).attr('data-section-id') + '/edit';
    },
    content_pattern: function() {
      return ' #' + $(this).attr('id') + ' .content';
    },
    refresh: function( ) { 
      this.refresh_called = true; 
      //$(".reloadable", this).load( self.source_url() + self.content_pattern(), RD.ui.initialize );
      $.extend(this,self);
      $(".reloadable", this).load( this.source_url() + this.content_pattern(), this.after_refresh );
    },
    after_refresh: function() {
      console.log($(this).text());
      RD.ui.initialize();
    }
  }, extension );
  return self;
};
