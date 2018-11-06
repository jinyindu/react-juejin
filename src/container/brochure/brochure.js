/**  
 * 小册
*/
import React from 'react'
import { connect } from 'react-redux'
import { isLogin } from '../../utils/utils'
//引入action
import * as brochure from '../../actions/brochure/brochure.action'
//引入组件
import BrochureItem from '../../components/brochure/index'
import LoadMore from '../../components/loadmore/index'


@connect(
    state => state.brochure, 
    { ...brochure}
)
class Brochure extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            xiaoceList:[],
            pageNum: 1,              //页面索引下标
			limit: 20,               //页面显示的数量
            hasMore:false,           //是否存在下一页
            isLoadingMore: false     //是否正在加载
        }
    }

    componentDidMount(){
        this.getData(true)
    }
    getData(i){
        const auth = isLogin()
        if(!i){
            this.setState({ pageNum: ++this.state.pageNum })
        }

        setTimeout(()=> {
            this.props.getListByLastTime({
                src: 'web',
                uid: auth.uid || '',
                device_id: auth.clientId,
                token: auth.token,
                pageNum: this.state.pageNum
            }).then(res => {
                if(res.errcode==0){
                    this.setState({
                        xiaoceList: this.state.xiaoceList.concat(res.data),
                        hasMore:res.data.length ===this.state.limit,
                        isLoadingMore: false
                    })
                }else{
                    this.setState({
                        xiaoceList: [],
                        hasMore: false,
                        isLoadingMore: false
                    })
                }
            })
        },100)
    }

     //下拉加载更多
     loadMoreData(){
        this.setState({
            isLoadingMore: true
        })
        this.getData()
    }

    render(){
        const { xiaoceList } = this.state
        return (
            <div>
                {
                    xiaoceList ? 
                    xiaoceList.map((item,index) => {
                        return (
                            <BrochureItem item = {item} key={item.id} />
                        )
                    }) : ''
                }
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

export default Brochure