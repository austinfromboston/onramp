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


RD.articles = ( function() {
  var self = {
    edit: function(ev) {
      //if( !$(ev.target).is('.remote_edit')) { return true; }
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
    is_pending: function( path ) {
      return ($('li#placement_ids_', path ).length > 0 );
    },
    create_pending: function( path ) {
      $('li#placement_ids_', path).each( function() {
        $('#create-placement select').val( $(this).attr('data-article-id'));
        var new_item = this;
        if( $(path).is('ol')) {
          var list_order = $('li[data-article-id]', path ).index(this);
          var after_create = function( response ) {
            $(new_item).attr('id', 'placement_ids_' + response.placement.id );
            self.save_order(path);
            //$.post( '/placement_orderings', '_method=put&authenticity_token=' + auth_token + '&' + $(path).sortable( 'serialize' ), function() { $('#top-items,#recent-items').trigger('ready') } );
            }; 
          $('#create-placement #placement_list_order').val(  list_order + 1 );
          $.post( '/placements.js', $('#create-placement').serialize(), after_create, 'json');
          $('#create-placement #placement_list_order').val( '' );
        } else {
          var after_create = function( response ) {
            $(new_item).attr('id', 'placement_ids_' + response.placement.id );
            self.default_order(path);
            //$.post( '/placement_orderings', '_method=delete&authenticity_token=' + auth_token + '&' + $(path).sortable( 'serialize' ), function() { $('#top-items,#recent-items').trigger('ready') } );
            }; 
          $.post( '/placements.js', $('#create-placement').serialize(), after_create, 'json');
        }
      } );
    },
    save_order: function( path ) {
      $.post( '/placement_orderings', '_method=put&authenticity_token=' + RD.auth_token + '&' + $(path).sortable( 'serialize' ), function() { $('#top-items,#recent-items').trigger('ready') } );
    },
    default_order: function( path ) {
      $.post( '/placement_orderings', '_method=delete&authenticity_token=' + RD.auth_token + '&' + $(path).sortable( 'serialize' ), function() { $('#top-items,#recent-items').trigger('ready') } );
    }
  };
  return self;
})();

RD.create_placement_list = function( path ) {
  var self = {
    has_pending: function( ) {
      return ($('li#placement_ids_', path).length > 0 );
    },
    entry: {
      after_create_ordered: function(response) {
        $(this).attr('id', 'placement_ids_' + response.placement.id );
        self.save_order(path);
      },
      after_create_recent: function( response ) {
        $(this).attr('id', 'placement_ids_' + response.placement.id );
        self.default_order(path);
      }
    },
    create_ordered_placement: function() {
      $('#create-placement select').val( $(this).attr('data-article-id'));
      var list_order = $('li[data-article-id]', path ).index(this);
      this.entry = self.entry;
      $('#create-placement #placement_list_order').val(  list_order + 1 );
      $.post( '/placements.js', $('#create-placement').serialize(), this.entry.after_create_ordered, 'json');
      $('#create-placement #placement_list_order').val( '' );
    },
    create_placement: function() {
      this.entry = self.entry;
      $.post( '/placements.js', $('#create-placement').serialize(), this.entry.after_create_recent, 'json');
    },
    create_any_pending_and_save: function() {
      if( self.has_pending() ) {
        self.create_all_pending();
      } else {
        self.save_order();
      }
    },
    create_all_pending: function( ) {
      $('li#placement_ids_', this).each( self.create_ordered_placement ); 
    },
    save_order: function( ) {
      $.post( '/placement_orderings', '_method=put&authenticity_token=' + RD.auth_token + '&' + $(path).sortable( 'serialize' ), function() { $('#top-items,#recent-items').trigger('ready') } );
    },
    default_order: function( ) {
      $.post( '/placement_orderings', '_method=delete&authenticity_token=' + RD.auth_token + '&' + $(path).sortable( 'serialize' ), function() { $('#top-items,#recent-items').trigger('ready') } );
    }
  };
  $(path)[0].list = self;
};
