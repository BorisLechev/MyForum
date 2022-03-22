import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleInputForm from "../../components/forms/article-input/article-input";
import articlesService from "../../services/articles";
import PageLayout from "../layout/layout";

const EditArticlePage = () => {
    const [article, setArticle] = useState({});
    const { id } = useParams();

    useEffect(() => {
      const fetchData = async () => {
          await articlesService.getArticleById(
            id,
            (data) => setArticle(data),
            (error) => console.log(error),
          );
        };
    
      fetchData();
    }, [id]);

    return (
        <PageLayout>
            <ArticleInputForm
                mode="edit"
                initialTitle={article.title}
                initialContent={article.content}
            />
        </PageLayout>
    );
};

export default EditArticlePage;