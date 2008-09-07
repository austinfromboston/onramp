Screw.Unit( function() {
  var form_selector;
  var current_form;
  before( function() {
    if( $('#dom_test').length === 0 ) {
      $('body').append('<div id="dom_test"></div>');
    }
    $('#dom_test').html( '<form action="/ui_tests" class="test_remote"><input name="ui_test[name]" type="text"/><input type="submit" value="Save Changes"></form>' );
    form_selector = '#dom_test .test_remote';
    current_form = $( form_selector );
    
    current_form.fn( RD.remote_form() );
  });

  describe('submitting remote forms', function() {
    var real_post;
    before( function() {
    });
    it('sends a post remotely', function() {
      real_post = $.post;
      $.post = function() { $.posted = true; }
      current_form.fn('submit');
      expect($.posted).to(be_true);
      $.post = real_post;
    } );

    it('calls a response callback', function( me ) {
      current_form.fn({ response: function(response) { $(this).attr('responded', true ); } } );
      current_form.fn('submit');
      using(me).wait(1).and_then( function() {
        expect( $(current_form).attr('responded') ).to( be_true );
      });
    });
    after( function() {
    } );
  });
});
