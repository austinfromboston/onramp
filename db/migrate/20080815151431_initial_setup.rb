class InitialSetup < ActiveRecord::Migration
  def self.up
    create_table 'articles' do |t|
      t.string  'title',  'subtitle', 'display'
      t.text    'body',   'blurb', 'metakeywords', 'metadescription', 'body_html'
      t.string  'status', :size => 25
      t.datetime   'published_at'
      t.timestamps
    end 

    create_table 'placements' do |t|
      t.integer 'article_id', 'section_id', 'list_order'
      t.timestamps
    end

    create_table 'sections' do |t|
      t.string 'name'
      t.integer 'header_id'
      t.timestamps
    end

    create_table 'images' do |t|
      t.text 'caption'
      t.string 'alt', 'image_filename', 'license'
      t.date 'date'
      t.timestamps
    end
  end

  def self.down
    drop_table 'images'

    drop_table 'sections'

    drop_table 'placements'

    drop_table 'articles'
  end
end
