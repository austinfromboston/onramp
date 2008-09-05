# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def section_options
    Section.all.map { |s| [ s.name, s.id ] }
  end

  def article_options( options = {} )
    items = Article.all
    if(options[:exclude_section])
      items = items - Section.find( options[:exclude_section] ).articles
    end
    items.map { |a| [ a.name, a.id ] }
  end

  def js_ui(library_name)
    "jquery/jquery.ui-1.5.1/ui/ui.#{library_name}.js"
  end
  def js_effect(library_name)
    "jquery/jquery.ui-1.5.1/ui/effects.#{library_name}.js"
  end
  def js_spec(library_name)
    if File.exist?( "#{RAILS_ROOT}/public/javascripts/spec/#{library_name}_spec.js" );
      javascript_include_tag "spec/#{library_name}_spec.js"
    end
  end
end
