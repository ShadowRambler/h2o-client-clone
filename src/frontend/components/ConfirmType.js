import React, {Component, PropTypes} from 'react';
import {Toast, List, Switch, Icon, Stepper, Radio, DatePicker, WhiteSpace, WingBlank, Button} from 'antd-mobile';
import 'moment/locale/zh-cn';
import {connect} from 'react-redux';
import {getDeliveryType} from  '../actions/delivery';
import moment from 'moment';
import {createForm} from 'rc-form';
const Item = List.Item;
const Brief = Item.Brief;

const RadioItem = Radio.RadioItem;




@createForm()
class ConfirmTypeContent extends Component {


    render() {
        const {getFieldProps, getFieldValue} = this.props.form;
        const {router, cacheUpdate, type} = this.props;
        const {deliveryType, payType, orderDetails} = this.props.data;
        const minDate = moment().locale('zh-cn').utcOffset(8);
        const maxDate = minDate.add(3, 'days');
        const maxTime = moment(type.deliveryEnd, 'HH:mm:ss').utcOffset(8);
        const minTime = moment(type.deliveryStart, 'HH:mm:ss').utcOffset(8);
        const appointStart = moment(this.props.data.appointStart ? this.props.data.appointStart.split(' ')[1] : type.deliveryStart, 'HH:mm:ss').utcOffset(8);
        const appointEnd = moment(this.props.data.appointEnd ? this.props.data.appointEnd.split(' ')[1] : type.deliveryEnd, 'HH:mm:ss').utcOffset(8);

        getFieldProps('deliveryType', {
            initialValue: deliveryType,
        });
        return <div>
            <List renderHeader={() => '支付方式'}>
                <Item>

                </Item>
                <Item>
                       <span className="am-radio-wrapper" style={{marginLeft: 10}} onClick={()=> {
                           cacheUpdate({
                               payType: '1'
                           })
                       }}>
                            <span className={ "am-radio " + (payType == '1' ? 'am-radio-checked' : '') }>
                                <span className="am-radio-inner"/>
                            </span>
                            <span>在线支付</span>
                        </span>
                    <span className="am-radio-wrapper" style={{marginLeft: 100}} onClick={()=> {
                        cacheUpdate({
                            payType: '2'
                        })
                    }}>
                            <span className={ "am-radio " + (payType == '2' ? 'am-radio-checked' : '') }>
                                <span className="am-radio-inner"/>
                            </span>
                            <span>货到付款</span>
                        </span>
                    <Radio style={{display: 'none'}}/>
                </Item>
            </List>
            <List renderHeader={() => '送货时间'}>
                <RadioItem name='deliveryType'
                           {...getFieldProps('deliveryType.1', {
                               valuePropName: 'checked',
                               exclusive: true,
                               getValueFromEvent: ({target:{checked}})=> {
                                   return checked ? '1' : ''
                               },
                               getValueProps: (value)=> {
                                   return {
                                       checked: value === '1',
                                   }
                               },
                           })}>
                    即时送 <span>(半小时内到达)</span>
                </RadioItem>
                <RadioItem name='deliveryType'
                           {...getFieldProps('deliveryType.2', {
                               valuePropName: 'checked',
                               exclusive: true,
                               getValueFromEvent: ({target:{checked}})=> {
                                   return checked ? '2' : ''
                               },
                               getValueProps: (value)=> {
                                   return {
                                       checked: value === '2',
                                   }
                               },
                           })}
                >
                    预约选择 <span>每日({type.deliveryStart + '-' + type.deliveryEnd})</span>
                </RadioItem>
                {
                    getFieldValue('deliveryType') == '2' ? (
                        <div>
                            <DatePicker
                                mode="date"
                                title="选择日期"
                                extra="可选,小于结束日期"
                                {...getFieldProps('date', {
                                    initialValue: minDate,
                                })}
                                minDate={minDate}
                                maxDate={maxDate}
                            >
                                <List.Item arrow="horizontal">配送日期</List.Item>
                            </DatePicker>
                            <DatePicker mode="time"
                                        {...getFieldProps('appointStart', {
                                            initialValue: appointStart,
                                        })}
                                        minDate={minTime}
                                        maxDate={getFieldValue('appointEnd') || maxTime}

                            >
                                <List.Item arrow="horizontal">开始时间</List.Item>
                            </DatePicker>
                            <DatePicker
                                mode="time"
                                {...getFieldProps('appointEnd', {
                                    initialValue: appointEnd,
                                })}
                                minDate={getFieldValue('appointStart') || minTime}
                                maxDate={maxTime}
                            >
                                <List.Item arrow="horizontal">结束时间</List.Item>
                            </DatePicker>
                        </div>
                    ) : null
                }

            </List>
            <WhiteSpace/>
            <WingBlank>
                <Button type="primary" onClick={()=> {
                    this.props.form.validateFields((errors, values) => {
                        if (errors) {
                            console.log('Errors in form!!!');
                            return;
                        }
                        cacheUpdate({
                            appointEnd: values.date.format('YYYY-MM-DD ') + values.appointEnd.format('HH:mm:ss'),
                            appointStart: values.date.format('YYYY-MM-DD ') + values.appointStart.format('HH:mm:ss'),
                            deliveryType: values.deliveryType
                        })
                        router.goBack();

                    });
                }}>
                    确认</Button>
            </WingBlank>

        </div>
    }
}
;

@connect((state, ownProps)=>({
    type: state.delivery.type.data
}), (dispatch, ownProps)=>({
    getDeliveryType: ()=>dispatch(getDeliveryType())
}))
class ConfirmType extends Component {

    componentWillMount() {
        !this.props.type && this.props.getDeliveryType();
    }

    render() {
        const {router, cacheUpdate, type, data} = this.props;
        const payload = {router, cacheUpdate, type, data};
        if (type) {
            return <ConfirmTypeContent {...payload}/>
        }
        return null
    }
}


export default ConfirmType;
