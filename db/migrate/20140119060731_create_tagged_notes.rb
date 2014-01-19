class CreateTaggedNotes < ActiveRecord::Migration
  def change
    create_table :tagged_notes do |t|
      t.integer :tag_id, :null => false
      t.integer :note_id, :null => false

      t.timestamps
    end
    add_index :tagged_notes, :tag_id
    add_index :tagged_notes, :note_id
    add_index :tagged_notes, [:tag_id, :note_id], :unique => true
  end
end
