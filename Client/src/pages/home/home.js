import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Articles from "../../components/articles/articles";
import articlesService from "../../services/articles";
import UserContext from '../../utils/context';
import PageLayout from "../layout/layout";
import styles from "../../components/button/button.module.css";
import Pagination from "../../components/pagination/pagination";

const HomePage = () => {
    const [articles, setArticles] = useState([]);
    const [articlesCount, setArticlesCount] = useState(0);

    const context = useContext(UserContext);
    const location = useLocation();

    const fetchArticles = async (page) => {
        await articlesService.getAllArticles(
            page,
            (data) => setArticles(data),
            (error) => console.log(error),
        );
    };

    useEffect(() => {
      const fetchData = async () => {
            const params = new URLSearchParams(location.search);
            const page = params.get("page");

            await fetchArticles(page);

            await articlesService.getArticlesCount(
                (count) => setArticlesCount(count),
                (error) => console.log(error),
            );
        };
    
      fetchData();
    }, [location.search]);
    
    return (
        <PageLayout>
            {context.user.userId ? (
                <Link to="/articles/create" className={styles.submit}>
                    Create Article
                </Link>
            ) : null}
            {articles.length > 0 ? (
                <Pagination
                    articlesPerPage="5"
                    totalArticles={articlesCount}
                    onClickHandler={fetchArticles}
                />
            ) : null}
            <Articles initialArticles={articles} />
        </PageLayout>
    );
};

export default HomePage;