# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time

  # See ActionController::RequestForgeryProtection for details
  # Uncomment the :secret if you're not using the cookie session store
  protect_from_forgery # :secret => '3b020684cfabe27211d671cabece3044'
  
  # See ActionController::Base for details 
  # Uncomment this to filter the contents of submitted sensitive data parameters
  # from your application log (in this case, all fields with names like "password"). 
  # filter_parameter_logging :password
  #
  protected 
  def assign_section(item)
    return item unless item.new_record? and params[:section_id]
    item.section_ids = [ params[:section_id] ] if item.respond_to?( :section_ids= )
    item.section_id = params[:section_id] if item.respond_to?(:section_id=)
    item
  end
end
