//define the RD object unless it already exists
var RD = RD || {};

//An article_inset is a container for ajax editing articles inline
RD.article_inset = function( extension ) {
  //create a blank object to perform the extension if no extension is passed
  var extension = extension || {};
  return $.extend( {
    edit: function() {
      //if the edit form is already showing the edit button acts as a cancel button
      if( $(this).is(':visible') ) { return $(this).fn('cancel'); }

      //fix current context for use in callback function
      var self = this;

      //load the article form over ajax and call the show_form method when complete
      //get the url to load from the href of the edit button
      $( '.remote_content', this).load( $('.edit', this).attr('href'), function() { $(self).fn('show_form'); } );

      //do not follow the edit link
      return false;
    },
    new: function() {
      //if the add article form is showing the new_article header acts as a cancel button
      if( $(this).is(':visible') ) { return $(this).fn('cancel'); }

      //the add-article header is now active
      $(this).parents('#add-article').removeClass('inactive');
      var self = this;

      //load the article form over ajax and call the show_form method when complete
      //get the url to load from the href of the add button
      $( '.remote_content', this).load( $('#add-article-button').attr('href'), function() { $(self).fn('show_form'); } );
      //do not follow the add link
      return false;
    },
    after_submit: function( response ) {
      //hide the inset
      $(this).hide( 1000 );

      //shut down wysiwyg editors
      $('.tiny_mce', this).each( function() { tinyMCE.get($(this).attr('id')).remove(); } );

      //remove the form
      $('.remote_content', this ).html('');

      //set the add-article header to inactive
      $(this).parents('#add-article').addClass('inactive');
    },
    cancel: function( ) {
      //hide the form and show the article description again
      $(this).hide(1200).prev('.description').show();

      //shut down the wysiwyg editors
      $('.tiny_mce', this).each( function() { tinyMCE.get($(this).attr('id')).remove(); } );
      $(this).queue( function() { 

        //remove the form
        $('.remote-content', this).html('');

        //set the add-article header to inactive
        $(this).parents('#add-article').addClass('inactive');
        $(this).dequeue();
      } );
      return false;
    },
    show_form: function() {
      //hide the article description and show the form
      $(this).prev('.description').hide('blind');
      $(this).show('blind', {}, 2000 );
      var self = this;

      //initialize the wysiwyg after the other effects finish
      $(self).queue( function(){ RD.load_wysiwyg(); $(self).dequeue(); } );

      //run the global updates event
      $('body').trigger('dom.updated');
    }
  }, extension );
};
