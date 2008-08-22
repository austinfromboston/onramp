class Section < ActiveRecord::Base
  has_many :placements, :order => 'list_order ASC'
end
