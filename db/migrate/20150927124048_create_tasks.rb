class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.boolean :complete, null: false, default: false
      t.belongs_to :list

      t.timestamps null: false
    end
  end
end
