import React, { useContext, useEffect, useState } from "react";
import Articles from "../../components/articles/articles";
import Profile from "../../components/profile/profile";
import articlesService from "../../services/articles";
import UserContext from "../../utils/context";
import PageLayout from "../layout/layout";

const ProfilePage = () => {
    const [articles, setArticles] = useState([]);
    const context = useContext(UserContext);

    useEffect(() => {
      const fetchData = async () => {
          await articlesService.getAllArticlesByCurrentUser(
              (data) => setArticles(data),
              (error) => console.log(error),
          );
      };
    
      fetchData();
    }, []);
    
    return (
        <PageLayout>
            <Profile
                username={context.user.username}
                articlesCount={articles.length}
            />
            <Articles initialArticles={articles} />
        </PageLayout>
    );
};

export default ProfilePage;