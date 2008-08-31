RD.interface = ( function(){
  var self  = {
    default_options: { 
      target:     false,
      source:     false,
      clear:      false,
      refresh:    false,
      highlight:  false,
      url:        false,
      hash:       "#"
    },
    init_options: function(options) {
      return $.extend( self.default_options, options );
    },
    update: function( options ) {
      var options = self.init_options(options);
      if ( options.url && options.target )  {
        $(options.target).load(options.url, null, RD.transitions.update( options ) );
      }
      window.location.hash = options.hash;
    },
    cancel: function( options ) {
      var options = self.init_options(options);
      if(options.hide) { $(options.hide).hide(1200); }
      if(options.clear) { $(options.clear).html(''); }
    },
    refresh: function( options ) {
    },

    submit: function( options ) {
      var options = self.init_options(options);
      if (!options.form) return;
      var url = $(options.form).attr('action') + '.js';
      var data = $(options.form).serialize();
      $.post( url, data, options.callback, 'json' );
      window.location.hash = "#"
       
    }
  };
  return self;
})();

RD.transitions = ( function(){
  var self  = {
    default_options: { 
      target:     false,
      source:     false,
      form:       false,
      clear:      false,
      refresh:    false,
      highlight:  false,
      url:        false,
      hash:       "#"
    },

    init_options: function(options) {
      return $.extend( self.default_options, options );
    },

    after_submit: function( options ) {
      var options = self.init_options(options);
      //if(options.hide) $(options.hide).hide(1200); 
      //if(options.clear) { $(options.clear).html(''); }
      if(options.refresh) { 
       }
    },

    update: function( options ) {
      var options = self.init_options(options);
      var update_target = function(response) {
          $(options.target).html( response );
        };
      if( !(options.source || options.show)) return update_target;

      var after_transfer = function() {
        $(options.show).removeClass('peeking', 1500 );
      };
      var transfer_from_source = function() {
        $(options.source).effect( 'transfer', { to: options.show, className: "shadow" }, 300, after_transfer ); 
      };

      return function( response ) { 
        //ensure show-target is hidden at start
        if($(options.show).is(':visible')) { $(options.show).hide( 200 ); }
        update_target(response); 
        if(options.source) {
          $(options.show).addClass('peeking').show( 1, transfer_from_source ); 
        } else {
          $(options.show).show( 1200 );
        }
      };
    },
  };
  return self;
})();

RD.stacks = ( function(){
  var stacks = {
    create: function( name, start_fn ){ 
      if( stacks[name] === undefined || $(stacks[name]).queue().length === 0 ) {
        stacks[name] = {
          add: function( fn ) { $(stacks[name]).queue( stacks.queuify(fn) ) },
          run: function() { stacks.run( name ) }
        };
      }
      $(stacks[name]).queue( function() {} );
      if( start_fn !== undefined ) {
        stacks[name].add(start_fn);
      }
    },
    queuify: function( fn ) {
      return function() {
        fn();
        $(this).dequeue();
      }
    },
    run: function( name ){ 
      $(stacks[name]).dequeue();
      RD.ui.initialize();
    },
    try: function( name ) {
      if ( stacks[ name ] === undefined ) { return function() {}; }
      return stacks[name].run
    }
  };
  return stacks;
})();

/*

$('.edit-article-inset').click( function(ev) {
    if( $(ev.target).is('.cancel')) {
      var source = $(ev.target).parents('.edit-article-inset').eq(0);
      if(source.length > 0 ) {
        RD.interface.cancel( {
          //hash: '#',
          hide: ".edit-article-inset",
          clear: ".edit-article-inset .remote_content"
        } );
      }
      return false;
    }
    if( $(ev.target).is(':submit')) {
      var source = $(ev.target).parents('.edit-article-inset').eq(0);
      if(source.length > 0 ) {
        var article_id = $(ev.target).parents('li').eq(0).attr('data-article-id');
        RD.interface.submit( {
          source: $(ev.target.form),
          //hash: '#',
          hide: source,
          clear: $(".remote_content", source ),
          refresh: '#section-content',
          highlight: '#section-content li[data-article-id='+article_id+']'
        } );
        return false;
      }
    }
} );

$('.remote_edit_article').click( function(ev) {
  var article_id = $(ev.target).parents('li').eq(0).attr('data-article-id');
  RD.interface.update( {
    target:$(ev.target).nextAll(".edit-article-inset").eq(0), 
    source: $(ev.target).parents,
    url: $(ev.target).attr('href'),
    hash: "edit-article-" + article_id
  } );
});
*/

