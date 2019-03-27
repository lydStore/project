import React from "react";

import { Link } from "react-router-dom";
import "./Footer.css";

import router from "../../router";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentClass: false
    };
  }
  componentDidMount() {}
  render() {
    return (
      <div className="footer">
        {router.map((item, index) => {
          return (
            <Link
              key={index}
              to={item.path}
              className={item.path == window.location.pathname ? "current" : ""}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    );
  }
}
