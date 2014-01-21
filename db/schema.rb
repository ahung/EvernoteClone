# encoding: UTF-8
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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140121192243) do

  create_table "notebooks", :force => true do |t|
    t.string   "name",       :null => false
    t.integer  "user_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "notebooks", ["user_id", "name"], :name => "index_notebooks_on_user_id_and_name", :unique => true
  add_index "notebooks", ["user_id"], :name => "index_notebooks_on_user_id"

  create_table "notes", :force => true do |t|
    t.string   "title",       :null => false
    t.text     "body"
    t.integer  "notebook_id", :null => false
    t.integer  "user_id",     :null => false
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "tagged_notes", :force => true do |t|
    t.integer  "tag_id",     :null => false
    t.integer  "note_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "name"
  end

  add_index "tagged_notes", ["note_id"], :name => "index_tagged_notes_on_note_id"
  add_index "tagged_notes", ["tag_id", "note_id"], :name => "index_tagged_notes_on_tag_id_and_note_id", :unique => true
  add_index "tagged_notes", ["tag_id"], :name => "index_tagged_notes_on_tag_id"

  create_table "tags", :force => true do |t|
    t.string   "name",       :null => false
    t.integer  "user_id",    :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "tags", ["name", "user_id"], :name => "index_tags_on_name_and_user_id", :unique => true
  add_index "tags", ["user_id"], :name => "index_tags_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "username",        :null => false
    t.string   "password_digest", :null => false
    t.string   "session_token",   :null => false
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "users", ["session_token"], :name => "index_users_on_session_token", :unique => true
  add_index "users", ["username"], :name => "index_users_on_username", :unique => true

end
