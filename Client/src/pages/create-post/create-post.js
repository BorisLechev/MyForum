import React from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layout/layout";
import PostInputForm from "../../components/forms/post-input/post-input";
import articlesService from "../../services/articles";

const CreatePostPage = () => {
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
            <PostInputForm
                initialTitle=""
                initialContent=""
                handleFormSubmit={handleFormSubmit}
            />
        </PageLayout>
    );
};

export default CreatePostPage;