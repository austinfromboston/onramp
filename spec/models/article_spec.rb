require File.dirname(__FILE__) + '/../spec_helper'

describe "Article" do
  before do
    @article = create_article :body => "Rikk"
  end

  it "updates body_html when body is updated" do
    @article.body = "Santorum"
    @article.body_html.should match(/Santorum/)
  end
  it "updates body when body_html is updated" do
    @article.body_html = "Santorum"
    @article.body.should match( /Sant/)
  end

  it "returns the escaped body_html value" do
    @article.body_html = "<p>ochre</p>" 
    @article.escaped_body_html.should match(/&lt;p&gt;ochre/) 
  end

  it "accepts an escaped_body_html value and unescapes it" do
    @article.escaped_body_html = "&lt;p&gt;ochre&lt;/p&gt;" 
    @article.body_html.should match(/<p>ochre<\/p>/) 
  end

end
