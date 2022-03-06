import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logout from "./components/logout/logout";
import CreatePostPage from "./pages/create-post/create-post";
import EditPostPage from "./pages/edit-post/edit-post";
import HomePage from "./pages/home/home";
import LoginPage from "./pages/login/login";
import PostDetailsPage from "./pages/post-details/post-details";
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
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/register">
                <RegisterPage />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
              <Route exact path="/profile">
                <ProfilePage />
              </Route>
              <Route exact path="/articles/create">
                <CreatePostPage />
              </Route>
              <Route exact path="/articles/:id">
                <PostDetailsPage />
              </Route>
              <Route exact path="/articles/edit/:id">
                <EditPostPage />
              </Route>
            </Routes>
          </Router>
      </UserContext.Provider>
  );
}

export default App;
