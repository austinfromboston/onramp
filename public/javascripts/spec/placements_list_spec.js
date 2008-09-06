Screw.Unit( function() {
  var list;
  before( function() {
    if( $('#dom_test').length === 0 ) {
      //$('body').append('<div id="dom_test"></div>');
    }
    $('#dom_test').html( '<ol class="placements_list" id="test-items" data-section-id="5"><div class="reloadable"></div></ol>');
    list = '#dom_test .placements_list';
    $(list).fn( RD.placements_list() );
  });
  describe('refresh the list', function() {
    before( function() {
      $(list).fn( RD.placements_list( { 
        source_url: function() { return '/javascripts/spec/fixtures/ajax_success.html' } } ));
      $(list).fn('refresh');
    } );

    it('loads new data into reloadable', function() {
      setTimeout( function() { window.Screw.Unit( function() { describe('async tests', function() { it('loaded data ok', function() { expect( $(list).text()).to(equal, 'success'); }); })}); $(Screw).dequeue();}, 300 );
      //expect( $(list).text()).to(equal, 'success');
    } );

    it('calls refresh as we expect', function() {
      expect( $(list)[0].refresh_called ).to(be_true);
    });
  } );
  describe('self awareness', function() {
    it('knows its source url', function() {
      expect( $(list).fn('source_url')).to( equal, '/sections/5/edit');
    } );
    it('knows where its content lives', function() {
      expect( $(list).fn('content_pattern')).to( equal, ' #test-items .content');
    });
  });
});
