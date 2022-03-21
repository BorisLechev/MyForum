import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PageLayout from "../layout/layout";
import ArticleInputForm from "../../components/forms/article-input/article-input";
import articlesService from "../../services/articles";
import UserContext from "../../utils/context";

const CreateArticlePage = () => {
    const navigate = useNavigate();
    const context = useContext(UserContext);

    const handleFormSubmit = async (event, title, content) => {
        event.preventDefault();

        const body = {
            title,
            content,
        };

        await articlesService.createArticle(
            body,
            (response) => navigate(`/articles/${response.id}`),
            () => console.log(),
        );
    };

    return (
        <React.Fragment>
            {context.user.username ? (
                <PageLayout>
                    <ArticleInputForm
                        initialTitle=""
                        initialContent=""
                        handleFormSubmit={handleFormSubmit}
                    />
                </PageLayout>
            ) : (
                <Navigate to="/login" replace />
            )}
        </React.Fragment>
    );
};

export default CreateArticlePage;