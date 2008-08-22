require File.dirname(__FILE__) + '/../spec_helper'
describe ArticleHelper do
  before do
    @article = create_article :body => "jana\nnadia"
  end
  it "shows a formatted article body unless body_html is set" do
    helper.article_body( @article ).should match(/jana\n<br \/>nadia/)
  end
end
