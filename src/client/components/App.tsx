import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./Pages/Home";
import ImageShow from "./Pages/ImageShow";
import Layout from "./Layout";

export default () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/image-show" component={ImageShow} />
        </Switch>
      </Layout>
    </Router>
  );
};
