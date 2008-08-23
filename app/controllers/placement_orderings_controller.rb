class PlacementOrderingsController < ApplicationController
  def update
    @placements = [ Placement.find( params[:placement_ids] ) ].flatten
    params[:placement_ids].each_with_index do |placement_id, index|
      next unless placement = @placements.find { |p| p.id == placement_id.to_i }
      placement.update_attribute( :list_order, index + 1 )
    end if @placements and !@placements.empty?
    head :ok
    
  end

  def destroy
    @placements = Placement.find_all_by_id( params[:placement_ids])
    if @placements.all? { |p| p.update_attribute :list_order, nil }
      head :ok
    else
      head :unprocessable_entity
    end
  end
end
