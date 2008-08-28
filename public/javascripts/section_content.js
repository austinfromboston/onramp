RD.interface = ( function() { 
  var self = {
    //add_article = $('#add-article-inset').extend( { poo: function() { this.show(); alert('ppo'); } } );
  }
} )();

$('#add-article-button').click( function(ev) { 
  RD.interface.update( {
    target:"#add-article-inset", 
    source: $(ev.target),
    url: "/sections/" + RD.section.id + "/articles/new",
    hash: "add-article"
  } );
} );

$('#add-article-inset').click( function(ev) {
    if( $(ev.target).is('.cancel')) {
      RD.interface.cancel( {
        //hash: '#',
        hide: "#add-article-inset",
        clear: "#add-article-inset .remote_content"
      } );
      return false;
    };
    if( $(ev.target).is(':submit')) {
      RD.interface.submit( {
        source: $(ev.target.form),
        //hash: '#',
        hide: "#add-article-inset",
        clear: "#add-article-inset .remote_content",
        refresh: '#section-content',
        highlight: '#section-content li[data-article-id=[response_id]]'
      } );
      return false;
    };
  } );

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

