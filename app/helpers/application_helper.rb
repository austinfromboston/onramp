# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def section_options
    Section.all.map { |s| [ s.name, s.id ] }
  end

  def article_options
    Article.all.map { |a| [ a.name, a.id ] }
  end

  def js_ui(library_name)
    "jquery/jquery.ui-1.5.1/ui/ui.#{library_name}.js"
  end
end
