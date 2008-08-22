class PlacementsController < ApplicationController
  make_resourceful do
    actions :all
  end

  def current_object
    assign_section super 
  end
end
