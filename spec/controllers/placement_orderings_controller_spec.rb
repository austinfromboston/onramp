require File.dirname(__FILE__) + '/../spec_helper'

describe PlacementOrderingsController do
  before do
    @placement = create_placement :list_order => 1
    @placement_2 = create_placement :list_order => 2
    @placement_3 = create_placement :list_order => 3
    @placement_ids = [ @placement.id, @placement_3.id, @placement_2.id ]
  end

  describe "PUT #update" do
    def act!
      put :update, :placement_ids  => @placement_ids 
    end
    it "updates existing placements" do
      Placement.stub!(:find).and_return [ @placement ]
      @placement.should_receive(:update_attribute).with(:list_order, 1)
      act!
    end
    it "changes the order based on the incoming order" do
      act!
      Placement.find( :all, :conditions => ['id in(?)', @placement_ids ], :order => 'list_order' ).should == [ @placement, @placement_3, @placement_2 ]
    end
  end
  describe "DELETE #destroy" do
    def act!
      delete :destroy, :placement_ids  => @placement_ids[2]
    end
    it "removes order markers from existing placements" do
      act!
      Placement.find( @placement_ids[2] ).list_order.should be_nil
    end
  end
  
end
