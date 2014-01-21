class TaggedNote < ActiveRecord::Base
  attr_accessible :note_id, :tag_id, :name
  
  validates :note_id, :tag_id, :name, :presence => true
  
  belongs_to :note
  belongs_to :tag
end
