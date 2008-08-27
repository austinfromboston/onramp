if( RD === undefined ) { var RD = function() { return { }; }; }
RD.load_wysiwyg = function() {
  tinyMCE.init( { 
    mode: "textareas", 
    theme: "advanced", 
    editor_selector: "tiny_mce",  
    theme_advanced_toolbar_location:"top", 
    theme_advanced_toolbar_align: "left", 
    theme_advanced_blockformats: "p,div,h1,h2,h3,h4,h5,h6,code",
    theme_advanced_styles: "Title=title;Subheader=subheader;Caption=caption;",
    content_css: '/stylesheets/users.css',
    theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,sup,sub,charmap,|,link,unlink,anchor,image,|,undo,redo,|,cleanup,code", 
    theme_advanced_buttons2: "styleselect,justifyleft,justifycenter,justifyright,|,bullist,numlist,|,outdent,indent,|,hr,removeformat,visualaid",
    theme_advanced_buttons3: ""
    } ); 
};

RD.ui = ( function() {
  var self = {
    peek: function( item ) {
      item.addClass('peeking').show();
      return item;
    },
    show: function( item ) {
      self.peek(item).removeClass('peeking', 1500);
      return item;
    },
    hide: function( item ) {
      item.addClass('peeking', 2500);
      window.setTimeout( function() {
        item.hide();
        item.removeClass('peeking');
      }, 2800 );
      return item;
    },
    clear: function( item ) {
      item.html('');
      return item;
    },
    add_title: function( item, title_text ) {
      item.prepend( $('<h6 class="info"></h6>').text( title_text ) );
      return item;
    },
    initialize: function() {
      $( '.js-only' ).removeClass('js-only');
      $( '#remote-staging' ).html( '' );
    }
  };
  return self;
})();

RD.articles = ( function() {
  var self = {
    edit: function(ev) {
      if( !$(ev.target).is('.remote_edit')) { return true; }
      var url = $(ev.target).attr('href');
      self.display.element = $(ev.target).parents('li').eq(0).find('.edit-article-inset').eq(0);
      $.get( url, {}, self.display.edit );
      return false;
    },
    add: function( ev ) {
      var target = $(ev.target).attr('data-target');
      var source_url = $(ev.target).attr('href');
      self.display.element = $( target );
      $.get( source_url, {}, self.display.add );
    },
    display: (function() {
      var display_self = {
        element: undefined,
        add: function( html ) {
          display_self.open(html);
          display_self.override_submit( RD.placements.display.create );
          window.location.hash = "new_article";
        },
        edit: function( html ) {
          display_self.open(html);
          display_self.override_submit( RD.placements.display.update );
          var container = $( display_self.element ).parents('li').eq(0);
          window.location.hash = "edit_article_" + container.attr('data-article-id');
          return false;
        },
        open: function( html ) {
          $('.remote_content', display_self.element).html( html );
          RD.ui.show( $(display_self.element) );
          window.setTimeout( RD.load_wysiwyg, 3000 );
          var form = $('form', display_self.element );
          display_self.override_cancel();
        },
        override_submit: function(result_callback ) {
          var form = $( 'form', display_self.element );
          $(':submit', display_self.element).click( function(ev) {
            $.post( form.attr('action') + '.js', form.serialize(), result_callback, 'json' );
            return false;
          } );
        },
        override_cancel: function() {
          $('.cancel', display_self.element ).click( function() {
            RD.ui.hide(display_self.element).find('.remote_content').html('');
            return false;
          } );
        }
      };
      return display_self;
    })()
  };
  return self;
  
})();

RD.placements = ( function() {
  var self = {
    refresh: function( html ) {
      $.get('/sections/'+RD.section.id+'/placements', {}, self.display.refresh );
    },
    display: (function() {
      var display_self = {
        refresh: function( html ) {
          $( '#remote-staging' ).html( html );
          $( '#section-content #top-items .content' ).html( $( '#remote-staging #top-items .content' ).html());
          $( '#section-content #recent-items .content' ).html( $( '#remote-staging #recent-items .content' ).html());
          RD.ui.initialize();
          window.location.hash = '#';  
          if (display_self.new_article !== undefined) { 
            display_self.new_article_transition();
            display_self.new_article = undefined;
          }
          if (display_self.updated_article !== undefined) { 
            display_self.updated_article_transition();
            display_self.updated_article = undefined;
          }
        },
        create: function( response ) {
          display_self.new_article = response.article;
          self.refresh();
        },
        update: function( response ) {
          display_self.updated_article = response.article;
          RD.ui.hide( RD.articles.display.element);
          self.refresh();
        },
        updated_article_transition: function() {
          var updated_item = $('#section-content li[data-article-id='+ display_self.updated_article.id +']');
          RD.ui.show( updated_item );
        },
        new_article_transition: function() {
          var new_item = $('#section-content li[data-article-id='+ display_self.new_article.id +']');
          new_item.addClass('peeking');

          var source = $(RD.articles.display.element);
          $('.remote_content', source ).html('');
          RD.ui.peek(source);
          source.effect('transfer', { to:new_item, className:'shadow'}, 300, function() {
            RD.ui.show( new_item );
            $( source ).hide('slow');
          } );
        }
      };
      return display_self;
    })()
      
  };
  return self;
})();
