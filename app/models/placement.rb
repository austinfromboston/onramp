class Placement < ActiveRecord::Base
  belongs_to :section
  belongs_to :article

  def name
    article.name if article
  end
end
