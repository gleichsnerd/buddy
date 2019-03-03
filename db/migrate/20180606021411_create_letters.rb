class CreateLetters < ActiveRecord::Migration[5.1]
  def change
    create_table :letters do |t|
      t.references :mailbox, foreign_key: true
      t.references :sender
      t.references :recipient
      t.string :subject
      t.string :body

      t.timestamps
    end

    add_foreign_key :letters, :users, column: :sender_id, primary_key: :id
    add_foreign_key :letters, :users, column: :recipient_id, primary_key: :id
  end
end
