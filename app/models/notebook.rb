class Notebook < ActiveRecord::Base
  attr_accessible :name, :user_id
  
  validates :name, :user_id, :presence => true
  
  belongs_to :user
  has_many :notes, :dependent => :destroy
end
