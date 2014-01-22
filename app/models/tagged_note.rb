class TaggedNote < ActiveRecord::Base
  attr_accessible :note_id, :tag_id
  
  validates :note_id, :tag_id, :presence => true
  
  belongs_to :note
  belongs_to :tag
end
