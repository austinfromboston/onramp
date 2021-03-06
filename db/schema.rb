# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20080815151431) do

  create_table "articles", :force => true do |t|
    t.string   "title"
    t.string   "subtitle"
    t.string   "display"
    t.text     "body"
    t.text     "blurb"
    t.text     "metakeywords"
    t.text     "metadescription"
    t.text     "body_html"
    t.string   "status"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "published_at"
  end

  create_table "images", :force => true do |t|
    t.text     "caption"
    t.string   "alt"
    t.string   "image_filename"
    t.string   "license"
    t.date     "date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "placements", :force => true do |t|
    t.integer "article_id"
    t.integer "section_id"
    t.integer "list_order"
  end

  create_table "sections", :force => true do |t|
    t.string  "name"
    t.integer "header_id"
  end

end
