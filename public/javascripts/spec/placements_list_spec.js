Screw.Unit( function() {
  var list_selector;
  var current_list;
  before( function() {
    if( $('#dom_test').length === 0 ) {
      $('body').append('<div id="dom_test"></div>');
    }
    if( $('#async_dom_test').length === 0 ) {
      $('body').append('<div id="async_dom_test"></div>');
    }
    $('#dom_test').html( '<ol class="placements_list" id="test-items" data-section-id="5"><div class="reloadable"><div class="content"></div></div></ol>');
    list_selector = '#dom_test .placements_list';
    current_list = $( list_selector );
    
    current_list.fn( RD.placements_list() );
  });


  describe('refreshing the list', function() {
    before( function() {
      current_list = $( '<ol class="placements_list" id="test-items" data-section-id="5"><div class="reloadable"><div class="content"></div></div></ol>');
      $('#async_dom_test').append( current_list );
      current_list.fn( RD.placements_list( { 
        source_url: function() { return '/javascripts/spec/fixtures/ajax_success.html' }, 
        after_refresh: function() { $(this).attr('after_refreshed', true); }
      } ));
    } );

    it('loads new data into reloadable', function( me ) {
      var async_list = current_list;
      current_list.fn('refresh');
      using(me).wait(1).and_then( function() { 
        expect( async_list.text()).to(equal, 'success'); 
      } );
    } );

    it('calls after_refresh once new data has loaded', function( me ) {
      var asynk_list = current_list;

      $(asynk_list).fn('refresh');
      using(me).wait(1).and_then( function() { 
        expect( $(asynk_list).attr('after_refreshed') ).to( be_true ); 
      } );

    } );
      
    describe('highlighting new items', function() {
      before( function() {
        $( current_list.fn('content_selector')).html(   '<li id="placement_ids_1"></li>');
        $( current_list.fn('content_selector')).append( '<li id="placement_ids_2"></li>');
      });
      it('should be all items before refresh', function() {
        //expect(current_list.fn('new_items')).to(have_length, 2 );
      } );
      it('stores existing items before refresh', function() {
        current_list.fn('before_refresh');
        expect( current_list.data('previous_items')).to(have_length, 2 );
      } );

      it('marks items as new',  function() {
        current_list.fn('before_refresh');
        current_list.fn('mark_updated', 'placement_ids_2');
        expect( current_list.data('previous_items')).to(have_length, 1 );
      } );

      it('identifies new items after refresh',  function() {
        current_list.fn( RD.placements_list({ refresh: function() { 
          $(this).fn('before_refresh');
          $( current_list.fn('content_selector')).html(   '<li id="placement_ids_1"></li>');
          $( current_list.fn('content_selector')).append( '<li id="placement_ids_2"></li>');
          $( current_list.fn('content_selector')).append( '<li id="placement_ids_3"></li>');
        } } ));
        current_list.fn('refresh');
        
        expect( $( current_list.fn('new_items')).eq(0).attr('id') ).to( equal, 'placement_ids_3' );
        expect( $( current_list.fn('new_items')) ).to( have_length, 1);
      } );
    } );
  } );

  describe('self awareness', function() {
    it('knows its source url', function() {
      expect( $(list_selector).fn('source_url')).to( equal, '/sections/5/edit');
    } );
    it('knows where its content lives', function() {
      expect( $(list_selector).fn('content_selector')).to( equal, ' #test-items .content');
    });
  });
});
