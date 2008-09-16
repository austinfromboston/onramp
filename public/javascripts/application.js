//define the global RD object unless it already exists
var RD = RD || {};

//attached to the dom:updated event
//shows all js-dependent items that are hidden via CSS
//hides any items that should not be shown by converting their class to js-hidden
RD.dom_updated = function() {
  $( '.js-only' ).removeClass('js-only');
  $( '.js-hide' ).addClass('js-hidden').removeClass('js-hide');
  //$( '#remote-staging' ).html( '' );
}


//Initializes all visible wysiwyg editors with the class tiny_mce
RD.load_wysiwyg = function() { 
  window.tinyMCE.init( RD.tinymce_config );
  $('.tiny_mce:visible').each( function() {
    tinyMCE.execCommand( 'mceAddControl', false, $(this).attr('id') );
  });
};

//default configuration for wysiwyg editor
RD.tinymce_config = { 
  mode: 'none',
  theme: "advanced", 
  editor_selector: "tiny_mce",  
  content_css: '/stylesheets/users.css',
  theme_advanced_toolbar_location:"top", 
  theme_advanced_toolbar_align: "left", 
  theme_advanced_blockformats: "p,div,h1,h2,h3,h4,h5,h6,code",
  theme_advanced_styles: "Title=title;Subheader=subheader;Caption=caption;",
  theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,sup,sub,charmap,|,link,unlink,anchor,image,|,undo,redo,|,cleanup,code", 
  theme_advanced_buttons2: "styleselect,justifyleft,justifycenter,justifyright,|,bullist,numlist,|,outdent,indent,|,hr,removeformat,visualaid",
  theme_advanced_buttons3: ""
  }; 
