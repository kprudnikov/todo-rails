class AddPriorityToTask < ActiveRecord::Migration
  def up
    add_column :tasks, :priority, :integer, null: false, default: 0
  end

  def down
    remove_column :tasks, :priority
  end
end
