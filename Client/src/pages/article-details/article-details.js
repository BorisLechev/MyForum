import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Article from "../../components/article/article";
import Comment from "../../components/comments/comment";
import articlesService from "../../services/articles";
import PageLayout from "../layout/layout";
import styles from "./article-details.module.css";

const ArticleDetailsPage = () => {
    const [article, setArticle] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
          await articlesService.getArticleById(
              id,
              (data) => {
                  setArticle(data);
              },
              () => console.log(),
            );
        };
    
      fetchData();
    }, [id]);
    
    const deleteHandler = async () => {
        await articlesService.deleteArticle(
            id,
            () => navigate("/"),
            (error) => console.log(error),
        );
    };

    return (
        <PageLayout>
            <div className={styles.container}>
                <Article
                    articleId={id}
                    title={article.title}
                    description={article.content}
                    author={article.authorUserName}
                    createdOn={article.createdOn}
                    initialVotes={article.votesCount}
                    commentsCount={article.commentsCount}
                    deleteHandler={deleteHandler}
                />
            </div>
            <h4>Comments:</h4>
            <div>
                {article.comments && article.comments.map((comment) => (
                    <Comment
                        content={comment.content}
                        author={comment.authorUserName}
                        createdOn={comment.createdOn}
                    />
                ))}
            </div>
        </PageLayout>
    );
};

export default ArticleDetailsPage;