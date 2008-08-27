class Section < ActiveRecord::Base
  has_many :placements, :include => :article, :order => 'list_order ASC, articles.created_at DESC'
  has_many :articles, :through => :placements
end
