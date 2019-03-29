import React from "react";
import "./Games.css";
import { getindex } from "../../api";
export default class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: []
    };
  }
  //请求数据
  async initList() {
    const res = await getindex();
    if (res.ret === "0") {
      this.setState({
        dataList: res.data
      });
    }
  }
  //初始化数据
  componentWillMount() {
    this.initList();
  }
  render() {
    const dataList = this.state.dataList;
    return (
      <div className="index">
        首页
        <ul>
          {dataList.map((item, index) => {
            return (
              <li key={index}>
                {item.id}----{item.name}---{item.age}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
