class Tag < ActiveRecord::Base
  attr_accessible :name, :user_id
  
  validates :name, :user_id, :presence => true
  
  has_many :tagged_notes, :dependent => :destroy
  has_many :notes, :through => :tagged_notes
  belongs_to :user
end
