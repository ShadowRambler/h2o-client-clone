import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Menu, Breadcrumb, Icon ,Popconfirm } from 'antd';
import {withRouter} from 'react-router';
const SubMenu = Menu.SubMenu;
import {connect} from 'react-redux';
import '../assets/scss/app.scss';
import Sidebar from './Sidebar';
import {auth_logout} from '../actions/user'


@connect((state, ownProps)=>({
    user: state.user
}),(dispatch, ownProps)=>({
    auth_logout:()=>dispatch(auth_logout())
}))
@withRouter
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        }
        this.onCollapseChange = this.onCollapseChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    onCollapseChange() {
        this.setState({
            collapse: !this.state.collapse,
        })
    }

    handleLogout(){
        this.props.auth_logout();
        this.props.router.replace('/login');
    }

    render() {
        const routes = this.props.routes.filter(item=>item.title);

        const collapse = this.state.collapse;
        const key = this.props.location.pathname.split('/')[1] || 'root';
        const userName = this.props.user.data.account;
        return (
            <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
                <Sidebar>
                    <div className="ant-aside-action" onClick={this.onCollapseChange}>
                        {collapse ? <Icon type="right"/> : <Icon type="left"/>}
                    </div>
                </Sidebar>
                <div className="ant-layout-main">
                    <div className="ant-layout-header">

                        <span style={{float: 'right'}}>{userName}
                            <Popconfirm placement="bottomRight" title="确定要退出登录?" onConfirm={this.handleLogout}  okText="确定" cancelText="取消">
                                 <a href="#" >登出</a>
                            </Popconfirm>
                          </span>
                        <div className="ant-layout-breadcrumb">
                            <Breadcrumb>
                                {  routes.map((item,index)=>{
                                    return   (<Breadcrumb.Item key={index}>{item.title}</Breadcrumb.Item>)
                                })
                                }
                            </Breadcrumb>
                        </div>
                    </div>
                    <ReactCSSTransitionGroup className="ant-layout-container"
                                             component="div" transitionName="swap"
                                             transitionEnterTimeout={500} transitionLeaveTimeout={500}
                    >
                        {React.cloneElement(this.props.children || <div/>, {key})}
                    </ReactCSSTransitionGroup>
                    <div className="ant-layout-footer">
                        京东金融 © 2016
                    </div>
                </div>
            </div>
        );
    }
}
;


export default App;
