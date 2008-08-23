class Section < ActiveRecord::Base
  has_many :placements, :order => 'list_order ASC'
  has_many :articles, :through => :placements
end
