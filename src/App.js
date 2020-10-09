import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './components/about';
import Header from './components/commons/Header';
import Home from './components/home';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
