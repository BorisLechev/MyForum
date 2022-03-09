import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostInputForm from "../../components/forms/post-input/post-input";
import articlesService from "../../services/articles";
import PageLayout from "../layout/layout";

const EditPostPage = () => {
    const [article, setArticle] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

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
    
    const handleFormSubmit = async (event, title, content) => {
        event.preventDefault();

        const body = {
            title,
            content,
        };

        await articlesService.editArticle(
            id,
            body,
            (response) => navigate(`/articles/${response.id}`),
            (error) => console.log(error),
        );
    };

    return (
        <PageLayout>
            <PostInputForm
                initialTitle={article.title}
                initialContent={article.content}
                handleFormSubmit={handleFormSubmit}
            />
        </PageLayout>
    );
};

export default EditPostPage;