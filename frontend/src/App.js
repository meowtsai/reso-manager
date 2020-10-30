import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import H55TeamListScreen from "./screens/H55TeamListScreen";
import H55MatchScreen from "./screens/H55MatchScreen";
import RoleListScreen from "./screens/RoleListScreen";
import RoleEditScreen from "./screens/RoleEditScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/h55event/teamlist" component={H55TeamListScreen} />
          <Route path="/h55event/matchlist" component={H55MatchScreen} />
          <Route path="/manage/role" component={RoleListScreen} exact />
          <Route path="/manage/role/create" component={RoleEditScreen} />
          <Route path="/manage/role/edit/:id" component={RoleEditScreen} />
          <Route path="/manage/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
