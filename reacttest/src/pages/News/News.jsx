import React from "react";
import "./News.css";

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let { params } = this.props.match;
    console.log(params.id);
  }
  render() {
    return <div className="index">新闻</div>;
  }
}
