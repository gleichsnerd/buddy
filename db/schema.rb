# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180606021503) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "address_books", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "mailbox_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["mailbox_id"], name: "index_address_books_on_mailbox_id"
    t.index ["user_id"], name: "index_address_books_on_user_id"
  end

  create_table "letters", force: :cascade do |t|
    t.bigint "mailbox_id"
    t.bigint "sender_id"
    t.bigint "recipient_id"
    t.string "subject"
    t.string "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["mailbox_id"], name: "index_letters_on_mailbox_id"
    t.index ["recipient_id"], name: "index_letters_on_recipient_id"
    t.index ["sender_id"], name: "index_letters_on_sender_id"
  end

  create_table "mailboxes", force: :cascade do |t|
    t.bigint "user_id"
    t.string "alias"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_mailboxes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "address_books", "mailboxes"
  add_foreign_key "address_books", "users"
  add_foreign_key "letters", "mailboxes"
  add_foreign_key "letters", "users", column: "recipient_id"
  add_foreign_key "letters", "users", column: "sender_id"
  add_foreign_key "mailboxes", "users"
end
