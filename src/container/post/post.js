import React from 'react'
import {connect} from 'react-redux'
import marked from 'marked';
import { isLogin } from '../../utils/utils'
/** 引入action */
import * as post from '../../actions/post/post.action'
import './index.less'

@connect(
    state => state.post,
    { ...post}
)
class Post extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            postInfo: {},
            makedownInfo: ''
        }
    }

    componentDidMount(){
        this.getData(1)
        this.getData(2)
    }

    getData(type){
        const auth = isLogin()
        const query = this.props.match.params

        this.props.getPostDetail({
            uid: auth.uid || '',
            device_id: auth.clientId|| '',
            token: auth.token|| '',
            src: 'web',
            type: type === 1 ? 'entryView' : 'entry',
            postId: query.postId
        }).then(res => {
            if(res.errcode==0){
                if(type === 2){
                    this.setState({
                        postInfo: res.data
                    })
                }else{
                    this.setState({
                        makedownInfo: res.data.content
                    })
                }
            }
        })
    }
    render(){
        const { postInfo,makedownInfo} = this.state
        const output = marked(makedownInfo,{breaks: true})
        return (
            <div className='container'>
                {
                    postInfo ? 
                    <div className="post-detail">
                    { 
                        postInfo.screenshot ? <img src={postInfo.screenshot} style={{ height: 145,width: '100%' }}></img> : ''} 
                        <div className='content'>
                            <div className='user'>
                            <div className='avatar'>
                            {
                                postInfo.user ?
                                <img src={ (postInfo.user && postInfo.user.avatarLarge)|| require('../../assets/images/default_avatar.png')}></img> : ''
                            }
                                
                            </div>
                            <div className='info'>
                                <div className='name'>{postInfo.user && postInfo.user.username}</div>
                                <div className='others'>
                                    <span className='time'>{postInfo.createdAt}</span>
                                    <span>阅读 {postInfo.viewsCount}</span>
                                </div>
                            </div>
                            </div>
                            <div className='title'>{postInfo.title}</div>
                            <div id="goodDet" dangerouslySetInnerHTML={{__html: output}}></div>
                        </div> 
                    </div> :''
                }
            </div>
        )
    }
}

export default Post

// <div id="goodDet" dangerouslySetInnerHTML={{__html: this.htmlStrTrans(makedownInfo)}}></div>