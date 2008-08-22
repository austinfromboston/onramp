class Article < ActiveRecord::Base
  has_many :placements
  has_many :sections, :through => :placements

  before_save :reconcile_body

  STATUSES = %w/ draft published /

  def reconcile_body
    if changed.include? 'body'
      self.body_html = nil 
    elsif changed.include? 'body_html'
      self.body = nil 
    end
    true
  end

  def name 
    title
  end

end
