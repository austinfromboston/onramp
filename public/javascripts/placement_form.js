//create the global RD object unless it already exists
var RD = RD || {};

RD.placement_form = {
  //initialize a form element to act as a remote form, and run the local after_create method once it has submitted
  setup_create: function( el, ext ) {
    var ext = ext || {};
    $(el).fn( RD.remote_form( $.extend( { response: function(response) { $(el).fn('after_create', response); }}, ext ) ));
    $(el).fn( RD.placement_form );
  },

  //once a new placement has been created, run this
  after_create: function( response ) {
    // find the placement container and mark it as updated 
    // remove the 'new_placement' class and add the placement_id indicated in the response
    $(this).parents('.new_placement').eq(0).addClass('updated').removeClass('new_placement').attr('id', 'placement_ids_' + response.placement.id );

    //if we are inside a placements listing, resave that placements listing to ensure correct ordering
    if($(this).parents('.placements_list').length > 0 ) {

      //save refreshes lists automatically
      $(this).parents('.placements_list').fn('save');

    } else {

      //refresh all placement lists manually
      $('.placements_list').each( function() { $(this).fn('refresh'); } );
    }

    //remove the form that created the placement unless it is a permanent form
    if(!$(this).is('.permanent')) { $(this).remove(); }
  },

  //Configure a set of forms designated by the selector to destroy a placement over ajax
  setup_destroy: function( selector ) {
    $( selector ).livequery( 'submit', function(ev) {
      var self = ev.target;

      //extend the targetted form to act as a remote form
      //set the response action to remove the placement list item from the dom
      $(ev.target).fn(RD.remote_form( { response: function( response ) {
        var container = $(self).parents('li[id^=placement_ids]').eq(0);
        container.hide('puff');
        container.queue( function() { $(this).remove(); $(this).dequeue(); } );
      } } ));

      //submit the form over ajax
      $(ev.target).fn('submit', 'json');

      //do not propagate the submit event
      return false;
    });
  }
};
