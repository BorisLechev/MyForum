import moment from 'moment';
import React, { useContext } from 'react';
import ReactHtmlParser from "react-html-parser";
import { Link } from 'react-router-dom';
import UserContext from '../../utils/context';
import Audit from "../audit/audit";
import styles from './article.module.css';

const Article = ({
  index,
  articleId,
  title,
  description,
  author,
  createdOn,
  deleteHandler,
}) => {
  const detailsLink = `/articles/${articleId}`;

  const context = useContext(UserContext);
  const currentUsername = context.user.username;

  return (
    <div className={styles.article}>
			<h3 className={styles.title}>
				{articleId ? <Link to={detailsLink}>{title}</Link> : title}
			</h3>
			<div className={styles.description}>
				{ReactHtmlParser(description)}
			</div>
			<div className={styles.audit}>
				{currentUsername === author ? (
					<Audit
						index={index}
						articleId={articleId}
						title={title}
						handler={deleteHandler}
					/>
				) : null}
				<span>
					<small> Author: </small> {author}
				</span>
				<span>
					<small>{moment(createdOn).format("LLL")}</small>
				</span>
			</div>
		</div>
  );
};

export default Article;