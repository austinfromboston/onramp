class ArticlesController < ApplicationController
  make_resourceful do
    actions :all
    response_for :create do |format|
      format.html { redirect_to current_object }
      format.js { render :json => current_object.to_json(:include => :placements), :status => :created }
    end
  end

  def current_object
    assign_section super
  end
end
