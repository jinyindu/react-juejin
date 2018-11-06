import React from 'react'
import { connect } from 'react-redux'
import {Carousel} from 'antd-mobile'
import { isLogin } from '../../utils/utils'
import * as post from '../../actions/post/post.action'

//引入组件
import PostItemOne from '../../components/postItemOne/postItemOne'
import LoadMore from '../../components/loadmore/index'

//引入样式
import './index.less'
@connect(
    state => state.post,
    {
        ...post
    }
)
class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            rankList:[],
            pageNum: 1,              //页面索引下标
			limit: 10,            //页面显示的数量
            hasMore:false,           //是否存在下一页
            isLoadingMore: false,     //是否正在加载
        }
    }

    componentDidMount(){
        this.getBanner()
        this.getEntryRank()
    }

    //banner
    getBanner(){
        const auth = isLogin()
        let data = {
            position: 'explore',
            page: 0,
            pageSize: 20,
            platform: 'android',
            device_id: auth.clientId,
            client_id: auth.clientId,
            token: auth.token,
            src: 'android',
            t: new Date().getTime()
        }
        this.props.getBanner(data)
    }
    //热门文章
    getEntryRank(){
        const auth = isLogin()
        let rankList = this.state.rankList
        if (rankList.length==0) {
            rankList = [{ rankIndex: '' }]
        }
        let rankIndex = (rankList.slice(-1)[0].rankIndex) || ''
        let params = {
            src: 'web',
            uid: auth.uid || 'unlogin',
            device_id: auth.clientId,
            token: auth.token || '',
            limit: this.state.limit,
            before: rankIndex,
        }
        this.props.getEntryByRank(params).then(res => {
            if(res.errcode==0){
                this.setState({
                    rankList: this.state.rankList.concat(res.data.entrylist),
                    hasMore:res.data.entrylist.length ===this.state.limit,
                    isLoadingMore: false
                })
            }else{
                this.setState({
                    dataList: [],
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
        this.getEntryRank()
    }

    render(){
        const { bannerDetail } = this.props
        const bannerList = bannerDetail ? bannerDetail.banner : []
        const rankList = this.state.rankList

        return (
            <div className="container">
                <Carousel
                    autoplay={false}
                    infinite >
                    {
                        bannerList && bannerList.map((ele,index) => (
                        <a
                            key={ele.objectId}
                            >
                            <img
                                src={ ele.screenshot}
                                alt= { ele.title}
                                style={{ width: '100%', verticalAlign: 'top' }}
                            />
                        </a>
                    ))}
                </Carousel>
                <div className="hot card">
                    <div className="btitle">
                        <div className="l">
                            <img className="icon" src={require('../../assets/images/pin_hot.png')}></img>
                            <div>热门文章</div>
                        </div>
                    </div>
                    <PostItemOne data = { rankList } graphics="true"></PostItemOne>
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

export default Search