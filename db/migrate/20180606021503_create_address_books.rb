class CreateAddressBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :address_books do |t|
      t.references :user, foreign_key: true
      t.references :mailbox, foreign_key: true

      t.timestamps
    end
  end
end
