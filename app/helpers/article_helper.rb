module ArticleHelper
  def article_body( article )
    return simple_format(article.body) unless article.body_html
    article.body_html
  end

end
