import React, { useEffect, useState } from 'react';
import articlesService from '../../services/articles';
import Article from '../article/article';
import styles from './articles.module.css';

const Articles = ({ initialArticles }) => {
  const [articles, setArticles] = useState([]);

	useEffect(() => {
		const loadArticles = () => {
			setArticles(initialArticles);
		};

		loadArticles();
	}, [initialArticles]);

  const deleteHandler = async (articleId, helper, index) => {
    await articlesService.deleteArticle(
      articleId,
      () => {
        setArticles(articles.filter((article, i) => i !== index));
        helper();
      },
      (error) => console.log(error),
    );
  };

  return (
    <div className={styles.articles}>
      {articles.map((article, index) => (
        <Article
          key={article.id}
          index={index}
          articleId={article.id}
          title={article.title}
          author={article.authorUserName}
          description={article.content}
          createdOn={article.createdOn}
          deleteHandler={deleteHandler}
        />
      ))}
    </div>
  );
};

export default Articles;
