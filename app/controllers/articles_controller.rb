class ArticlesController < ApplicationController
  make_resourceful do
    actions :all
    response_for :index do |format|
      format.html {}
      format.js { render :json => current_objects }
    end
    response_for :create do |format|
      format.html { redirect_to current_object }
      format.js { render :json => current_object.to_json(:include => :placements), :status => :created }
    end
    response_for :update do |format|
      format.html { redirect_to current_object }
      format.js { render :json => current_object.to_json(:include => :placements), :status => :ok }
    end
  end

  def current_object
    assign_section super
  end

  def current_objects
    return super unless params[:query]
    search = Article
    if params[:query] && params[:query][:excluding_section]
      search = search.excluding_section( params[:query][:excluding_section] )
    end
    if params[:query] && params[:query][:fulltext]
      search = search.fulltext( params[:query][:fulltext] )
    end
    search.all
      
  end
end
