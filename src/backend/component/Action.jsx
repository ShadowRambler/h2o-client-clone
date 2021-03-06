import React, {Component , PropTypes } from 'react';
import { message } from 'antd';
import {withRouter} from 'react-router';



@withRouter
class Action extends Component {

    static defaultProps = {
        nextRoute:'',
        remoteMsg:'',
        didInvalidate:false,
        didUpdate:false,
    }
    static propTypes = {
        nextRoute: PropTypes.string,
        didInvalidate:PropTypes.bool,
        remoteMsg:PropTypes.string,
    }

    componentWillReceiveProps(nextProps){
        const  {didInvalidate,remoteMsg,didUpdate,router,nextRoute,updateHandle} = nextProps;

        if (didUpdate && didUpdate!=this.props.didUpdate  && typeof updateHandle =='function') {
            updateHandle(this)
            return false
        }

        if(didUpdate!=this.props.didUpdate || nextRoute!=this.props.nextRoute){
            if (didUpdate && nextRoute) {
                message.success('操作成功！');
                router.push(nextRoute)
                return false
            }
        }
        if(didInvalidate!=this.props.didInvalidate || remoteMsg!=this.props.remoteMsg){
            if(didInvalidate && remoteMsg){
                message.warn(remoteMsg)
            }
        }

    }

    render() {
     return   this.props.children?this.props.children:null
    }
}
;


export default Action;
