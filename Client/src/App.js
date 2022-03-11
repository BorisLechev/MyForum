import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logout from "./components/logout/logout";
import CreateArticlePage from "./pages/create-article/create-article";
import EditArticlePage from "./pages/edit-article/edit-article";
import HomePage from "./pages/home/home";
import LoginPage from "./pages/login/login";
import ArticleDetailsPage from "./pages/article-details/article-details";
import ProfilePage from "./pages/profile/profile";
import RegisterPage from "./pages/register/register";
import authService from "./services/auth";
import UserContext from "./utils/context";

function App() {
  const [user, setUser] = useState({ username: "", userId: "" });

  useEffect(() => {
    const fetchData = async () => {
        await authService.getIdentityDetails(
            (obj) => {
              setUser({ username: obj.username, userId: obj.userId })
            },
            (error) => console.log(error),
        );
    };
  
    fetchData();
  }, []);
  
  return (
      <UserContext.Provider value={{ user: user }}>
          <Router>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/logout" element={<Logout />} />
              <Route exact path="/profile" element={<ProfilePage />} />
              <Route exact path="/articles/create" element={<CreateArticlePage />} />
              <Route exact path="/articles/:id" element={<ArticleDetailsPage />} />
              <Route exact path="/articles/edit/:id" element={<EditArticlePage />} />
            </Routes>
          </Router>
      </UserContext.Provider>
  );
}

export default App;
