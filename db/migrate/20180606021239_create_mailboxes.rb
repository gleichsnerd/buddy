class CreateMailboxes < ActiveRecord::Migration[5.1]
  def change
    create_table :mailboxes do |t|
      t.references :user, foreign_key: true
      t.string :alias

      t.timestamps
    end
  end
end
