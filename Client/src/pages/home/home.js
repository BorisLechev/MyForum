import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Articles from "../../components/articles/articles";
import articlesService from "../../services/articles";
import UserContext from '../../utils/context';
import PageLayout from "../layout/layout";
import styles from "../../components/button/button.module.css";

const HomePage = () => {
    const [articles, setArticles] = useState([]);
    const context = useContext(UserContext);

    useEffect(() => {
      const fetchData = async () => {
          await articlesService.getAllArticles(
              (data) => setArticles(data),
              (error) => console.log(error),
            );
        };
    
      fetchData();
    }, []);
    
    return (
        <PageLayout>
            {context.user.userId ? (
                <Link to="/articles/create" className={styles.submit}>
                    Create Article
                </Link>
            ) : null}
            <Articles initialArticles={articles} />
        </PageLayout>
    );
};

export default HomePage;