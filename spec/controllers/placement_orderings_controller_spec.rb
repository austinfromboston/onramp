require File.dirname(__FILE__) + '/../spec_helper'

describe PlacementOrderingsController do
  before do
    @placement = create_placement
    Placement.stub!(:find).and_return [ @placement ]
  end
  def act!
    put :update, :placement_orderings => [ @placement.id ]
  end
  it "updates existing placements" do
    @placement.should_receive(:update_attribute).with(:list_order, 1)
    act!
    
  end
end
