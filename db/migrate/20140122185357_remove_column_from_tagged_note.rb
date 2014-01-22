class RemoveColumnFromTaggedNote < ActiveRecord::Migration
  def change
    remove_column :tagged_notes, :name
  end
end
