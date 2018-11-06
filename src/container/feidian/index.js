import React from 'react'
import { connect } from 'react-redux'
import { isLogin } from '../../utils/utils'
import { Carousel } from 'antd-mobile'
/** 引入组件 */
import FeidianItem from '../../components/feidianItem/index'

import * as feidian from '../../actions/feidian/feidian.action'
import LoadMore from '../../components/loadmore/index'

import './index.less'
@connect(
    state => state.feidian,
    { ...feidian }
)
class FeiDian extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pinRecommendList:[],
            pageNum: 1,              //页面索引下标
			limit: 20,               //页面显示的数量
            hasMore:false,           //是否存在下一页
            isLoadingMore: false,    //是否正在加载
        }
    }
    componentDidMount(){
        this.getHotRecommendList()
        this.getPinRecommendList()
    }

    componentWillReceiveProps(nextProps,nextState){
    }
    //热门推荐
    getHotRecommendList(){
        const auth = isLogin()
        /** 热门文章 */
        this.props.getHotRecommendList({
            uid: auth.uid || '',
            device_id: auth.clientId || '',
            client_id: auth.client_id || '',
            token: auth.token || '',
            src: 'web',
        })
    }
    //沸点文章
    getPinRecommendList(){
        const auth = isLogin()
        /** 沸点列表 */
        let list = this.state.pinRecommendList
        if(list.length == 0){
            list = [{ createdAt: '' }]
        }
        let createdAt = (list.slice(-1)[0].createdAt) || ''
        this.props.getPinRecommendList({
            uid: auth.uid || '',
            device_id: auth.clientId || '',
            token: auth.token || '',
            src: 'web',
            limit: this.state.limit,
            before: createdAt
        }).then(res => {
            if(res.errcode==0){
                this.setState({
                    pinRecommendList: this.state.pinRecommendList.concat(res.data.list),
                    hasMore:res.data.list.length ===this.state.limit,
                    isLoadingMore: false
                })
            }else{
                this.setState({
                    pinRecommendList: [],
                    hasMore: false,
                    isLoadingMore: false
                })
            }
        })
    }

    //下拉加载更多
    loadMoreData(){
        this.setState({
            isLoadingMore: true
        })
        this.getPinRecommendList()
    }

    render(){
        const {hotRecommend} = this.props
        const { pinRecommendList} = this.state
        return (
            <div className="container">
              <div className="recommendList">
              {
                hotRecommend ? 
                <Carousel 
                    className="space-carousel"
                    frameOverflow="visible"
                    dots={false}
                    cellSpacing={10}
                >
                {
                    hotRecommend.list.map((item, index) => (
                        <div className='item' key={index}>
                            {
                                item.isRecommend ?
                                    <div className='title'>
                                        <img className='icon' src={require('../../assets/images/ic_topic_star.png')}></img>
                                        <span>编辑推荐</span>
                                    </div>
                                :
                                <div className='title'>
                                    <img className='icon' src={require('../../assets/images/pin_hot.png')}></img>
                                    <span>热门沸点</span>
                                </div>
                            }
                            <div className='content'>
                            <div className='text'>{item.content}</div>
                            <div className='img'>
                                <img src={item.pictures[0]}></img>
                            </div>
                            </div>
                        </div>
                    ))
                }
                </Carousel> : ''
              }
              </div>
              <div className="pinList">
                {
                    pinRecommendList ? 
                    pinRecommendList.map((item,index) => {
                        return (
                            <FeidianItem details={item} key={item.objectId}/>
                        )
                    })
                    : ''
                }
              </div>
              {
                this.state.hasMore 
                ? <LoadMore 
                    isLoadingMore={this.state.isLoadingMore}
                    loadMoreFn={this.loadMoreData.bind(this)}
                ></LoadMore> : ''
              }
            </div>
        )
    }
}

export default FeiDian