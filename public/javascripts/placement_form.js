var RD = RD || {};

RD.placement_form = {
  setup_create: function( el, ext ) {
    var ext = ext || {};
    $(el).fn( RD.remote_form( $.extend( { response: function(response) { $(el).fn('after_create', response); }}, ext ) ));
    $(el).fn( RD.placement_form );
  },

  after_create: function( response ) {
    $(this).parents('.new_placement').eq(0).addClass('updated').removeClass('new_placement').attr('id', 'placement_ids_' + response.placement.id );
    if($(this).parents('.placements_list').length > 0 ) {
      $(this).parents('.placements_list').fn('save');
    } else {
      $('.placements_list').each( function() { $(this).fn('refresh'); } );
    }
    if(!$(this).is('.permanent')) { $(this).remove(); }
  },

  setup_destroy: function( selector ) {
    $( selector ).livequery( 'submit', function(ev) {
      var scope = ev.target;
      $(ev.target).fn(RD.remote_form( { response: function( response ) {
        var container = $(scope).parents('li[id^=placement_ids]').eq(0);
        container.hide('puff');
        container.queue( function() { $(this).remove(); $(this).dequeue(); } );
      } } ));
      $(ev.target).fn('submit', 'json');
      return false;
    });
  }
};
