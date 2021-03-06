/**
 * Created by zhangbohan on 16/11/21.
 */
import React, {Component} from 'react';
import {withRouter, Link} from 'react-router';
import { List,Icon ,Flex,Button,Modal ,WingBlank,WhiteSpace,NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import Order from './Order';
const Item = List.Item;
const Brief = Item.Brief;
import Action from './Action';

@connect((state, ownProps)=>({
    remoteMsg: state.order.item.remoteMsg,
    didInvalidate: state.order.item.didInvalidate,
    didUpdate: state.order.item.didUpdate,

}))
class OrderAction extends Action {
}

const map={
    '1':'待支付',
    '2':'进行中',
    '3':'已取消',
    '4':'已取消',
    '5':'已取消',
    '6':'进行中',
    '7':'已完成',
    '8':'已完成',
    '9':'已取消',
}


@withRouter
class OrderDetail extends Component {
    render(){
        const  {version,courierImageUrl,tradeMoney,courierName,courierPhone,userLocation,userHouseNumber,userName,userPhone,orderNo,createdDate,payType,orderDetails,status} = this.props.data;
        console.log('render',this.props)
        return (
            <div>
                <NavBar leftContent="返回" mode="light"  onLeftClick={() =>this.props.router.goBack() }
                >订单详情</NavBar>
                <List>
                    <Item>
                        <Flex justify="center">
                            <img src="https://zos.alipayobjects.com/rmsportal/NRzOqylcxEstLGf.png" style={{height: '1rem', width: '1rem'}}/>
                            <Flex.Item className="Item">
                                {map[status]}
                                {
                                    status+'' =='8' ?(<Brief>订单超过24小时自动完成</Brief>):null
                                }
                                {
                                    status+'' =='4' ?(<Brief>超过24小时未支付自动取消</Brief>):null
                                }

                            </Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <Flex justify="center">
                            <img src={orderDetails[0].imageUrls[0]} alt="" style={{height: '1rem', width: '1rem'}}/>
                            <Flex.Item className="Item">
                                {
                                    orderDetails.map((item,index)=>(<Flex key={index} justify="between" align="top" style={{whiteSpace:'normal'}}>
                                        <Flex.Item >
                                            {item.name+'*'+item.count}
                                        </Flex.Item>
                                        <div>￥：{item.money}</div>
                                    </Flex>))
                                }
                                <div style={{color:'red'}}>
                                    <span style={{float:'right'}}>￥：{tradeMoney}</span>
                                    实付：
                                </div>
                            </Flex.Item>
                        </Flex>
                    </Item>
                    {
                        courierName?(
                            <Item>
                                <Flex justify="center">
                                    <img alt="" src={courierImageUrl} style={{height: '1rem', width: '1rem'}}/>
                                    <Flex.Item className="Item">
                                        配送员  {courierName}
                                        <Brief>{courierPhone}</Brief>
                                    </Flex.Item>
                                </Flex>
                            </Item>
                        ):null
                    }
                    <Item >

                        <Flex justify="center" align="center">
                            收货信息
                            <Flex.Item style={{marginLeft:'0.2rem'}}>
                                {userLocation+userHouseNumber}
                                <Brief>{userName+userPhone}</Brief>
                            </Flex.Item>
                        </Flex>
                    </Item>
                    <Item>
                        <div>
                            订单号：{orderNo}
                        </div>
                        <div>
                            支付方式：{payType*1==1?'线上付款':'货到付款'}
                        </div>
                        <div>
                            下单时间：{createdDate}
                        </div>
                    </Item>

                </List>
                {
                    /^(2|6)$/.test(status)?(
                        <div>
                            <WhiteSpace/>
                            <WingBlank>
                                <Button onClick={()=>{
                                    Modal.prompt('取消订单', '请输入取消订单的原因', [
                                        { text: '取消' },
                                        { text: '确定', onPress: (reason) =>{
                                            this.props.orderCancelConfirm(orderNo,{
                                                reason,
                                                version
                                            })
                                        } },
                                    ]);

                                }}>取消订单</Button>
                            </WingBlank>
                        </div>
                    ):null
                }
            </div>

        )
    }
}


@connect((state, ownProps)=>({
    data:state.order.item.data,
}))
class OrderRequest extends Component {
    componentWillMount(){
        const id = this.props.params.id;
        this.props.fetchOrderIfNeeded(id)
    }
    render(){
        console.log('render',this.props)
        const {data} = this.props;
        const id = this.props.params.id;
        if(!data){
            return null
        }
        return (
           <div>
               <OrderAction updateHandle={()=>{
                   this.props.fetchOrderIfNeeded(id)
               }}/>
               <OrderDetail data={data} {...this.props} />
           </div>
        )
    }
}



class OrderItem extends Component {
    render(){
        return (
           <Order>
               <OrderRequest {...this.props}/>
           </Order>
        )
    }
}


export default OrderItem;