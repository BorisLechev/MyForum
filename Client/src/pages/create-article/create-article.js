import React from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layout/layout";
import ArticleInputForm from "../../components/forms/article-input/article-input";
import articlesService from "../../services/articles";

const CreateArticlePage = () => {
    const navigate = useNavigate();

    const handleFormSubmit = async (event, title, content) => {
        event.preventDefault();

        const body = {
            title,
            content,
        };

        await articlesService.createArticle(
            body,
            (response) => navigate(`/articles/${response.id}`),
            (error) => console.log(error),
        );
    };

    return (
        <PageLayout>
            <ArticleInputForm
                initialTitle=""
                initialContent=""
                handleFormSubmit={handleFormSubmit}
            />
        </PageLayout>
    );
};

export default CreateArticlePage;