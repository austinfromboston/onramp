(function($) {
  $(Screw)
    .bind('loaded', function() {    
      $('.describe, .it')
        .click(function() {
          document.location = location.href.split('?')[0] + '?' + $(this).fn('selector');
          return false;
        })
        .focus(function() {
          return $(this).addClass('focused');
        })
        .bind('scroll', function() {
          var sel = $(this).fn('selector');
          var use_browser_top = $.inArray(sel, [ Screw.Defaults.to_run + ':eq(0)', 'body > .describe']) >= 0;
          document.body.scrollTop = use_browser_top ? 0 : $(this).offset().top;
        });

      $('.it')
        .bind('enqueued', function() {
          $(this).addClass('enqueued');
        })
        .bind('running', function() {
          $(this)
            .addClass('running')
            .removeClass('failed')
            .removeClass('passed');
        })
        .bind('passed', function() {
          $(this)
            .addClass('passed')
            .removeClass('failed');
          $('.status').fn('display');
        })
        .bind('failed', function(e, reason) {
          reason = reason || '';
          $(this)
            .addClass('failed')
            .removeClass('passed')
            .append($('<p class="error"></p>').text(reason.toString()));
          $('.status').fn('display');
          if (reason.fileName || reason.lineNumber) {
            $(this)
              .append($('<p class="error"></p>').text(reason.fileName + " : " + reason.lineNumber));
          }
        })
    })
    .bind('before', function() {
      Screw.suite_start_time = new Date();
      $('.status').text('Running...');
    })
    .bind('after', function() {
      $('.status').fn('display')
    })
})(jQuery);
