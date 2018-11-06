import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { isLogin } from '../../utils/utils'
import './index.less'

/** 引入action */
import * as post from '../../actions/post/post.action'

/** 引入组件 */
import PostList from '../../components/postList/index'
import PostItemOne from '../../components/postItemOne/postItemOne'
import LoadMore from '../../components/loadmore/index'

@connect(
    state => state.post,
    { ...post }
)
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            logined: false,
            dataList:[],             //数据集合
            pageNum: 1,              //页面索引下标
			limit: 10,            //页面显示的数量
            hasMore:false,           //是否存在下一页
            isLoadingMore: false,     //是否正在加载
            hotRecomment: [],
            hotRrecommendShow: true,
            rotate:''
        }
        this.refreshHot = this.refreshHot.bind(this)
    }
    componentDidMount(){
        const auth = isLogin()
        this.getData()
        this.setState({
            logined: auth
        })
        if(auth){
            this.getEntryByHotRecomment()
        }
    }
    refreshHot(){
        this.setState({
            rotate: 'rotate',
        })
        let timer = setTimeout(() => {
            this.setState({
              rotate: '',
            })
            clearTimeout(timer)
        }, 800)
        let hotRecomment = this.state.hotRecomment
        this.userFilterEntry(hotRecomment.map(item => {
            return item.objectId
        }))
    }
    userFilterEntry(ids){
        const auth = isLogin()
        let params = {
            src: 'web',
            uid: auth.uid,
            device_id: auth.clientId,
            client_id: auth.clientId,
            token: auth.token,
            entryId: ids.join('|'),
        }
        this.props.getUserFilterEntry(params).then(res => {
            if(res.errcode == 0){
                this.getEntryByHotRecomment()
            }
        })
    }
    //热门推荐
    getEntryByHotRecomment(){
        const auth = isLogin()
        
        let params = {
            src: 'web',
            uid: auth.uid || '',
            device_id: auth.clientId || '',
            client_id: auth.clientId || '',
            token: auth.token || '',
            limit: 20,
        }
        this.props.getEntryByHotRecomment(params).then(res => {
            if(res.errcode==0){
                
                let entrylist = (res && res.data.entry && res.data.entry.entrylist) || []
                this.setState({ hotRecomment: entrylist.slice(0, 3) })
                if(entrylist.length>0){
                    if(!this.state.hotRrecommendShow){
                        this.setState({ hotRrecommendShow: true })
                    }
                }else{
                    if(this.state.hotRrecommendShow){
                        this.setState({ hotRrecommendShow: false})
                    }
                }
            }
        })
    }
    getData(){
        let dataList = this.state.dataList
        if(dataList.length==0){
            dataList = [{ verifyCreatedAt: '' }]
        }
        let rankIndex = (dataList.slice(-1)[0].verifyCreatedAt) || ''

        let params = {
            src: 'web',
            uid:'',
            device_id:'',
            token:'',
            limit:this.state.limit,
            category: 'all',
            recomment:1,
            before:rankIndex,
            t:new Date().getTime()
        }
        this.props.getTimeLineList(params)
            .then(res => {
                if(res.errcode==0){
                    this.setState({
                        dataList: this.state.dataList.concat(res.data.entrylist),
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
        this.getData()
    }
    render(){
        const pageData = this.state.dataList
        const hotRecomment = this.state.hotRecomment
        
        return (
            <div>
                {
                    !this.state.logined ?
                        <Link className="noLogin" to="/login">
                        <div className="card guide">
                            <div className="left">
                                <div className="t">登录账户</div>
                                <div className="content">收藏文章，同步阅读记录，数据永不丢失</div>
                            </div>
                            <div className="right">登录</div>
                        </div>
                    </Link>: null
                }
                {
                    this.state.hotRecomment.length && this.state.hotRrecommendShow 
                    ? 
                    <div className="hot card">
                        <div className="btitle" onClick={this.refreshHot}>
                            <div className='l'>
                                <img className='icon' src={require('../../assets/images/ic_hot_home.png')}></img>
                                <div>热门推荐</div>
                            </div>
                            <div className='r'>
                                <img className='refresh ${rotate}'  src={require('../../assets/images/refresh_icon.png')}></img>
                                <img className='close' src={require('../../assets/images/chart_close.png')}></img>
                            </div>
                        </div>
                        <PostItemOne data = {hotRecomment } graphics="true"></PostItemOne>
                    </div> : null
                }
                <PostList data={pageData}></PostList>
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

export default Home