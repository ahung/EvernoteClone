class Note < ActiveRecord::Base
  attr_accessible :title, :body, :notebook_id, :user_id
  
  validates :user_id, :title, :presence => true
  
  belongs_to :user
  belongs_to :notebook
end
