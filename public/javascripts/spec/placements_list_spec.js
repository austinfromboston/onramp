Screw.Unit( function() {
  var list_selector;
  var current_list;
  before( function() {
    if( $('#dom_test').length === 0 ) {
      //$('body').append('<div id="dom_test"></div>');
    }
    $('#dom_test').html( '<ol class="placements_list" id="test-items" data-section-id="5"><div class="reloadable"></div></ol>');
    list_selector = '#dom_test .placements_list';
    current_list = $( list_selector );
    
    current_list.fn( RD.placements_list() );
  });
  describe('refresh the list', function() {
    before( function() {
      current_list.fn( RD.placements_list( { 
        source_url: function() { return '/javascripts/spec/fixtures/ajax_success.html' } } ));
      $(list_selector).fn('refresh');
    } );

    it('loads new data into reloadable', function( me ) {
      var async_list = $(list_selector);
      using(me).wait(1).and_then( function() { 
        expect( async_list.text()).to(equal, 'success'); 
      } );
    } );

    it('calls refresh as we expect', function() {
      expect( $(list_selector)[0].refresh_called ).to(be_true);
    });
  } );
  describe('self awareness', function() {
    it('knows its source url', function() {
      expect( $(list_selector).fn('source_url')).to( equal, '/sections/5/edit');
    } );
    it('knows where its content lives', function() {
      expect( $(list_selector).fn('content_pattern')).to( equal, ' #test-items .content');
    });
  });
});
