import React from "react";
import { Navigate } from "react-router-dom";
import PageLayout from "../layout/layout";
import ArticleInputForm from "../../components/forms/article-input/article-input";
import getCurrentCookie from "../../utils/cookieHelper";

const CreateArticlePage = () => (
    <React.Fragment>
        {getCurrentCookie() ? (
            <PageLayout>
                <ArticleInputForm
                    mode="create"
                    initialTitle=""
                    initialContent=""
                />
            </PageLayout>
        ) : (
            <Navigate to="/login" replace />
        )}
    </React.Fragment>
);

export default CreateArticlePage;