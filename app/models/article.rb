class Article < ActiveRecord::Base
  has_many :placements
  has_many :sections, :through => :placements

  #before_save :reconcile_body

  STATUSES = %w/ draft published /

  def body=(value)
    write_attribute :body_html, format_body(value) 
    super value
  end

  def body_html=(value)
    write_attribute :body, remove_format(value)
    super value
  end 

  def format_body(value)
    ActionView::Base.new.simple_format( value )
  end
  def remove_format(value)
    value.gsub(/<\/?[^>]*>/, "")
  end

  def name 
    title
  end

  def escaped_body_html
    ActionView::Base.new.escape_once( body_html )
  end
  def escaped_body_html=(value)
    self.body_html = CGI.unescapeHTML(value)
  end

  attr_accessor :new_placement_section_id
  after_save :create_new_placement
  def create_new_placement
    return true unless new_placement_section_id
    placements.create :section_id => new_placement_section_id
  end

end
