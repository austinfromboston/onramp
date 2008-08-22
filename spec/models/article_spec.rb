require File.dirname(__FILE__) + '/../spec_helper'

describe "Article" do
  before do
    @article = create_article :body => "Joe", :body_html => "Rikk"
  end
  it "has a body" do
    @article.body.should == "Joe"
  end

  it "removes body_html when body is updated" do
    @article.body = "Santorum"
    @article.reconcile_body
    @article.body_html.should be_blank 
  end
  it "removes body when body_html is updated" do
    @article.body_html = "Santorum"
    @article.reconcile_body
    @article.body.should be_blank 
  end

end
