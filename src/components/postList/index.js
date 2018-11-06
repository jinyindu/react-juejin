import React from 'react';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import { toPostDetail } from '../../utils/utils'
import './index.less'

@withRouter
class PostList extends React.Component{
    static propsTypes = {
        data: PropTypes.array.isRequired
    }
    constructor(props){
        super(props)
    }
    onGoPostDetail(v){
        let url =  toPostDetail(v)
        this.props.history.push(url)
     }

    render(){
        const postData = this.props.data
        return(
           <div>
                {
                    postData && postData.map(v=>(
                        <div className="item card postlist" key={v.objectId} onClick={()=>this.onGoPostDetail(v)}>
                            <div className="header">
                                <div className="name">
                                    <img src={ v.user.avatarLarge? v.user.avatarLarge: require('../../assets/images/default_avatar.png') }></img>
                                    <span>{v.user.username}</span>
                                </div>
                                <div className='type'></div>
                            </div>
                            <div className='content'>
                                <div className='text'>
                                <div className='title'>{v.title}</div>
                                <div className='desc'>{v.content}</div>
                                </div>
                                
                            </div>
                            <div className='footer'>
                                <div className='label'>
                                    <img src={require('../../assets/images/ic_dynamic_collect.png')}></img>
                                    <div>{v.collectionCount || '喜欢'}</div>
                                </div>
                                <div className='label'>
                                    <img src={require('../../assets/images/ic_dynamic_comment.png')}></img>
                                    <div>{v.commentsCount || '评论'}</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            
           </div>
        )
    }
}

export default PostList