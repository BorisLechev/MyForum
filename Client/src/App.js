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
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/logout" element={<Logout />} />
              <Route exact path="/profile" element={<ProfilePage />} />
              <Route exact path="/articles/create" element={<CreatePostPage />} />
              <Route exact path="/articles/:id" element={<PostDetailsPage />} />
              <Route exact path="/articles/edit/:id" element={<EditPostPage />} />
            </Routes>
          </Router>
      </UserContext.Provider>
  );
}

export default App;
