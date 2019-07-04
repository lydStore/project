import React from "react";
require('./my.scss');
export default class My extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'我的'
        }
    }
    render() {
        return(
            <div className="container">
                {this.state.name}
            </div>
        )
    }
}
