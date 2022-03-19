import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Articles from "../../components/articles/articles";
import Pagination from "../../components/pagination/pagination";
import Profile from "../../components/profile/profile";
import articlesService from "../../services/articles";
import UserContext from "../../utils/context";
import PageLayout from "../layout/layout";

const ProfilePage = () => {
    const [articles, setArticles] = useState([]);
    const [articlesCount, setArticlesCount] = useState(0);
    const context = useContext(UserContext);

    const location = useLocation();

    const fetchArticles = async (page) => {
        await articlesService.getAllArticlesByCurrentUser(
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

          await articlesService.getArticlesCountByCurrentUser(
              (count) => setArticlesCount(count),
              (error) => console.log(error),
          );
      };
    
      fetchData();
    }, [location.search]);
    
    return (
        <PageLayout>
            <Profile
                username={context.user.username}
                articlesCount={articlesCount}
            />
            <Pagination
                articlesPerPage="5"
                totalArticles={articlesCount}
                baseUrl="profile/"
                onClickHandler={fetchArticles}
            />
            <Articles initialArticles={articles} />
        </PageLayout>
    );
};

export default ProfilePage;