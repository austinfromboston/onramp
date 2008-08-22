class PlacementOrderingsController < ApplicationController
  def update
    @placements = Placement.find( params[:placement_orderings] )
    @placements.each_with_index do |placement, index|
      placement.update_attribute :list_order, index + 1
    end
    
  end
end
