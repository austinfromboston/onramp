class PlacementsController < ApplicationController
  make_resourceful do
    actions :all
    response_for :create do |format|
      format.html { redirect_to placement_path(current_object) }
      format.js { render :json => current_object.to_json(:include => :article), :status => :created }
    end
    response_for :destroy do |format|
      format.html do
        flash[:notice] = "Removed article form #{@placement.section.name}"
        redirect_to edit_section_path(@placement.section)
      end
      format.js { render :json => current_object, :status => :ok }
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
