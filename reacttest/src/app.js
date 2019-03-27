import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import router from "./router";
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          {router.map((route, key) => {
            return (
              <Route
                exact
                key={key}
                path={route.path}
                component={route.component}
              />
            );
          })}
          <Footer />
        </Router>
      </div>
    );
  }
}
