class AvailableArticlesController < ApplicationController
  before_filter :section_required
  
  def index
    @placements = current_objects
  end

  def section_required
    params[:section_id] && @section = Section.find(params[:section_id] )
  end

  def current_objects
    search = Article.excluding_section( @section.id ) 
    if params[:query] && params[:query][:fulltext]
      search = search.fulltext( params[:query][:fulltext] )
    end
    search.all.map do |article|
      @section.placements.build :article => article
    end
  end
end
