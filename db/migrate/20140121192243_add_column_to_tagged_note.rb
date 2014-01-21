class AddColumnToTaggedNote < ActiveRecord::Migration
  def change
    add_column :tagged_notes, :name, :string
  end
end
