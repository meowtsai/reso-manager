import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import H55TeamListScreen from "./screens/H55TeamListScreen";
import H55MatchScreen from "./screens/H55MatchScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />

          <Route path="/" component={HomeScreen} exact />
          <Route path="/h55event/teamlist" component={H55TeamListScreen} />
          <Route path="/h55event/matchlist" component={H55MatchScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
