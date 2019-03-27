import React from "react";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./Footer.css";

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <Link to="/">首页</Link>
        <Link to="/news/3">新闻</Link>
      </div>
    );
  }
}
