import React from "react";

import { Link } from "react-router-dom";
import "./Footer.scss";

import menuConfig from "../../router/menuConfig";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: window.location.pathname
    };
  }
  //切换当前样式
  changeUrl = () => {
    this.setState({
      path: window.location.pathname
    });
  };
  render() {
    return (
      <div className="footer">
        {menuConfig.map((item, index) => {
          return (
            <Link
              onClick={this.changeUrl}
              key={index}
              to={item.path}
              className={
                window.location.pathname === item.path ? "current" : ""
              }
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    );
  }
}
