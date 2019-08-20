import React from "react";
import "./Games.scss";
import { getindex } from "../../api";
export default class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: []
    };
  }
  //请求数据
  initList = async () => {
    const res = await getindex();
    if (res.ret === "0") {
      this.setState({
        dataList: res.data,
        like:false
      });
    }
  };
  //初始化数据
  componentWillMount() {
    this.initList();
  }

  handleToggle=()=>{
    this.setState({
      like:!this.state.like
    })
  };

  HelloMessage=()=><div> Hello props.nam</div>;

  render() {
    const dataList = this.state.dataList;
    let p = {};
    p.foo = 123;
    p.aa = 456;
    const  text = this.state.like ? 'like':'didn\'t like';
    return (
      <div className="game">
        游戏
        <button onClick={this.initList}>请求数据</button>
        <this.HelloMessage/>
        <h2 onClick={this.handleToggle}>you {text} this;</h2>
        <ul>
          {dataList.map((item, index) => {
            return (
              <li key={index} {...p} >
                {item.id}----{item.name}---{item.age}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
