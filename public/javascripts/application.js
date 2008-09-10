if( RD === undefined ) { var RD = {}; }

RD.dom_updated = function() {
  $( '.js-only' ).removeClass('js-only');
  $( '.js-hide' ).addClass('js-hidden').removeClass('js-hide');
  //$( '#remote-staging' ).html( '' );
}


RD.load_wysiwyg = function() { 
  window.tinyMCE.init( RD.tinymce_config );
  $('.tiny_mce:visible').each( function() {
    tinyMCE.execCommand( 'mceAddControl', false, $(this).attr('id') );
  });
};
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
