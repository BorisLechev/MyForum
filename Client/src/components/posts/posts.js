import React, { useEffect, useState } from 'react';
import articlesService from '../../services/articles';
import Post from '../post/post';
import styles from './posts.module.css';

const Posts = ({ initialPosts }) => {
  const [posts, setPosts] = useState([]);

	useEffect(() => {
		const loadPosts = () => {
			setPosts(initialPosts);
		};

		loadPosts();
	}, [initialPosts]);

  const deleteHandler = async (articleId, helper, index) => {
    await articlesService.deleteArticle(
      articleId,
      () => {
        console.log(index);
        setPosts(posts.filter((post, i) => i !== index));
        helper();
      },
      (error) => console.log(error),
    );
  };

  return (
    <div className={styles.posts}>
      {posts.map((post, index) => (
        <Post
          key={post.id}
          index={index}
          articleId={post.id}
          title={post.title}
          author={post.authorUsername}
          description={post.content}
          createdOn={post.createdOn}
          deleteHandler={deleteHandler}
        />
      ))}
    </div>
  );
};

export default Posts;
