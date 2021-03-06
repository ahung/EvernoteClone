class Note < ActiveRecord::Base
  attr_accessible :title, :body, :notebook_id, :user_id
  
  validates :user_id, :title, :presence => true
  
  belongs_to :user
  belongs_to :notebook
  has_many :tagged_notes, :dependent => :destroy
  has_many :tags, :through => :tagged_notes
end
