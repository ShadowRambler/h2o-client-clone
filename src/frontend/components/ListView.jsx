import React, {Component} from 'react';
import { ListView,Icon,List,Flex ,Button,Modal,Tag,Toast,Result,RefreshControl} from 'antd-mobile';




class MyListView  extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => {
                return row1 !== row2
            },
        });
        this.state=  {
            dataSource: dataSource.cloneWithRows([]),
            isLoading: false,
            isEnd:false
        };
        this.data =[];
        this.resetData = this.resetData.bind(this);
    }
    componentWillMount(){
        this.props.fetchData({
            pageNum:1,
            pageSize:this.props.pageSize||20
        })
    }
    resetData (){
        this.data = [];

        this.props.fetchData({
            pageNum:1,
            pageSize:this.props.pageSize||20
        })
    }
    combineData(data){
        this.data = this.data.concat(data)
    }
    componentWillReceiveProps(nextProps){
        console.warn('componentWillReceiveProps',nextProps);
        if(nextProps.pagination.pageNum=='1'){
            this.data =[];
        }
        if(nextProps.isLoading && !this.props.isLoading){
            this.setState({
                isLoading: true,
            });
        }
        if(nextProps.didUpdate && !this.props.didUpdate) {
            this.combineData(nextProps.data)
            console.log(this.data.length);
            let isEnd = false;
            if(nextProps.pagination.totalCount*1||0==this.data.length){
                isEnd = true;
            }
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.data),
                isLoading: false,
                isEnd
            });
        }

    }

    onEndReached(event) {
        // load new data
        // alert('onEndReached')]

        if(this.state.isEnd){
            return
        }
        if(this.props.pagination.totalCount*1||0 >this.state.dataSource.getRowCount()){
            this.props.fetchData({
                pageNum:this.props.pagination.pageNum*1+1,
                pageSize:this.props.pageSize
            })

        }


    }

    render() {
        let props = {};

        console.log(this.props)
        if(this.props.refresh){
            props = {
                useZscroller:true,
                refreshControl:<RefreshControl
                    refreshing={this.state.isLoading}
                    distanceToRefresh={100}
                    icon={<div style={{lineHeight: '50px'}}>
                        <div className="am-refresh-control-pull">
                            <Icon type="down"/> 下拉刷新
                        </div>
                        <div className="am-refresh-control-release">
                            <Icon type="left" style={{ transform: 'rotate(90deg)' }} /> 释放以加载
                        </div>
                    </div>}
                    onRefresh={()=>{
                        this.resetData();
                    }
                    }
                />
            }
        }
        else {
            props={
                useBodyScroll:true
            }
        }

        const renderFooter = ()=>{
            if(this.state.isLoading){
                                // return <div style={{  textAlign: 'center' ,padding:'15px 30px'}}>加载中...</div>
            }
            if(this.state.isEnd){
                if(this.state.dataSource.getRowCount()==0){
                    return this.props.endView||null
                }
                // return <div style={{  textAlign: 'center',padding:'15px 30px' }}>到底了</div>
            }
            // return <div style={{  textAlign: 'center',padding:'15px 30px' }}>加载完毕</div>
            return null
        }

        return    <ListView
            {...this.props}
            dataSource={this.state.dataSource}
            renderFooter={renderFooter}
            renderRow={this.props.row}
            className="am-list no-padding"
            scrollRenderAheadDistance={500}
            scrollEventThrottle={20}
            onScroll={() => { console.log('scroll'); }}
            onEndReached={(event)=>this.onEndReached(event)}
            onEndReachedThreshold={20}
            {
                ...props
            }
        />

    }
}






export default MyListView