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
    initialize: function() {
      $( '.js-only' ).removeClass('js-only');
      $( '#remote-staging' ).html( '' );
      if( $('.tiny_mce:visible').length > 0 ) {
        window.setTimeout( RD.load_wysiwyg, 1000 );
      }
    }
  };
  return self;
})();
