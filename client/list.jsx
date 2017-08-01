'use strict'

import { Component } from 'react';
import { Link } from 'react-router';

import Loading from './components/loading';

import Footer from './components/footer';

import BottomLoader from './components/BottomLoader';


class List extends Component {

	constructor(props) {
    super(props);
		this.props.params.pageNum=1;
    this.state = {
    	loadingPop: true,
    	pollList: []
    };
  }
  componentDidMount() {
    $('#globalTransition').css('display', 'none');
  	//滚动监听事件处理
    const that=this;
    const bl = new BottomLoader(this);
    let name=that.props.params.name;
    let pageNum=that.props.params.pageNum;
    bl.addCallback(function(){ // debouce
      if(name === userInfo.name){
        that.fetchPollList(pageNum,name);
      }else{
        that.fetchPollList(pageNum);
      }
      pageNum++;
    },{
      diff:300, // 触发距离（距离底部）
      immediately:true
    });	
  }
  fetchPollList(pageNum,userName){
    $.ajax({
      type: "POST",
      url: '/api/getPollList',
      async: true,
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify({'userName': userName,'pageSize': 5, 'pageNum':pageNum }),
      dataType: 'json',
      success: function (data) {
        if(data && data.length !== 0) {
          this.setState({
          	pollList: this.state.pollList.concat(data),
          	loadingPop: false
          });
        } else {
        	this.setState({
        		loadingPop: false
        	});
        }
      }.bind(this)
  	});
  }

  render() {
    return (
			<div className = "listpage">
				{this.state.pollList.map((item)=>(
					<Link to = {"/detail/" + item.pollID}>
						<div className="panel panel-default">
						  <div className="panel-heading">
						    <h3 className="panel-title">{item.title}</h3>
						  </div>
						  <div className="panel-body">
						  	{item.description}
						  </div>
              <div className="panel-footer">Created by {item.ownerName}</div>
						</div>
					</Link>
				))}
				{this.state.loadingPop && <Loading />}
				{!this.state.loadingPop &&
					this.state.pollList.length === 0 &&
					<div> no result ~ </div>
				}
				<Footer />
			</div>
    );
  }

}

export default List;
