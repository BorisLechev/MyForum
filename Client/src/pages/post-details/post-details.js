import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Post from "../../components/post/post";
import articlesService from "../../services/articles";
import PageLayout from "../layout/layout";
import styles from "./post-details.module.css";

const PostDetailsPage = () => {
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
                <Post
                    articleId={id}
                    title={article.title}
                    description={article.content}
                    author={article.authorUsername}
                    createdOn={article.createdOn}
                    deleteHandler={deleteHandler}
                />
            </div>
        </PageLayout>
    );
};

export default PostDetailsPage;