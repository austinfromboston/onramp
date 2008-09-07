class UiTestsController < ApplicationController 
  layout 'spec'
  skip_before_filter :verify_authenticity_token
  def show
  end

  def create
    head :ok
  end
end
