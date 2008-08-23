class PlacementsController < ApplicationController
  make_resourceful do
    actions :all
    response_for :create do |format|
      format.html {}
      format.js { render :json => current_object, :status => :created }
    end
  end

  def current_object
    assign_section super 
  end
end
