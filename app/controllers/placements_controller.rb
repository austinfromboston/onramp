class PlacementsController < ApplicationController
  make_resourceful do
    actions :all
    response_for :create do |format|
      format.html {}
      format.js { render :json => current_object.to_json(:include => :article), :status => :created }
    end
  end

  def current_object
    assign_section super 
  end

  def current_objects
    if params[:section_id]
      Section.find(params[:section_id]).placements 
    else
      Placement.all
    end
  end
end
