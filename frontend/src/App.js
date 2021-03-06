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
import ResourceListScreen from "./screens/ResourceListScreen";
import ResourceEditScreen from "./screens/ResourceEditScreen";
import ResourceCreateScreen from "./screens/ResourceCreateScreen";
import PermissionAccountScreen from "./screens/PermissionAccountScreen";
import MentorsGameListScreen from "./screens/mentors/GameListScreen";
import MentorListScreen from "./screens/mentors/MentorListScreen";
import MentorEditScreen from "./screens/mentors/MentorEditScreen";
import RecordListScreen from "./screens/mentors/RecordListScreen";

import H55CosplayListScreen from "./screens/H55CosplayListScreen";
import H55CosplayReportScreen from "./screens/H55CosplayReportScreen";
import H55CosplayJudgeScreen from "./screens/H55CosplayJudgeScreen";


import H55CardScreen from "./screens/H55CardScreen";

import KolListScreen from "./screens/KolListScreen";
import SocialMediaListScreen from "./screens/quotes/SocialMediaListScreen";
import SocialMediaCreateScreen from "./screens/quotes/SocialMediaCreateScreen";
import QuotesKOLHomeScreen from "./screens/quotes/QuotesKOLHomeScreen";
import KOLCreateScreen from "./screens/quotes/KOLCreateScreen";
import KOLEditScreen from "./screens/quotes/KOLEditScreen";
import KOLDetailPageScreen from "./screens/quotes/KOLDetailPageScreen";
import QuotesKOLPriceScreen from "./screens/quotes/QuotesKOLPriceScreen";
import KOLQueryScreen from "./screens/quotes/KOLQueryScreen";

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
          <Route
            path="/h55event/cosplaylist"
            component={H55CosplayListScreen}
          />
          <Route
            path="/h55event/cosplayreport"
            component={H55CosplayReportScreen}
          />
          <Route
            path="/h55event/cosplayjudge"
            component={H55CosplayJudgeScreen}
          />
          <Route
            path="/h55card/home"
            component={H55CardScreen}
          />



          <Route path="/manage/role" component={RoleListScreen} exact />
          <Route path="/manage/role/create" component={RoleEditScreen} />
          <Route path="/manage/role/edit/:id" component={RoleEditScreen} />
          <Route path="/manage/userlist" component={UserListScreen} />
          <Route path="/manage/user/:id/edit" component={UserEditScreen} />
          <Route
            path="/manage/permission/:id"
            component={PermissionAccountScreen}
          />

          <Route path="/manage/resourcelist" component={ResourceListScreen} />
          <Route
            path="/manage/resource/:id/edit"
            component={ResourceEditScreen}
          />
          <Route
            path="/manage/resource/create"
            component={ResourceCreateScreen}
          />

          <Route path="/mentors/gamelist" component={MentorsGameListScreen} />
          <Route path="/mentors/mentorlist" component={MentorListScreen} />
          <Route path="/mentors/mentor/:id/edit" component={MentorEditScreen} />
          <Route path="/mentors/recordlist" component={RecordListScreen} />
          <Route path="/kol/list" component={KolListScreen} />
          <Route
            path="/quotes/socialmedias/list"
            component={SocialMediaListScreen}
          />
          <Route
            path="/quotes/socialmedias/create"
            component={SocialMediaCreateScreen}
          />

          <Route path="/quotes/kol/list" component={QuotesKOLHomeScreen} />
          <Route path="/quotes/kol/price" component={QuotesKOLPriceScreen} />
          <Route
            path="/quotes/kol/:tagid/tag"
            component={QuotesKOLHomeScreen}
          />
          <Route path="/quotes/kol/create" component={KOLCreateScreen} />
          <Route path="/quotes/kol/:id/edit" component={KOLEditScreen} />
          <Route path="/quotes/kol/:id/view" component={KOLDetailPageScreen} />
          <Route path="/quotes/kol/query" component={KOLQueryScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
