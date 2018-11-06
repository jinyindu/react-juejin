import React from 'react'
import './feidianBotton.less'

class FeidianItemBotton extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const { item } = this.props
        return(
            <div className='feidian-footer'>
                <div className='i'>
                   { item.isLiked ? 
                    <img src={require('../../assets/images/zan_green_feidian3.png')}></img> 
                    : 
                    <img src={require('../../assets/images/zan_grey_feidian3.png')}></img>
                   } 
                    <span>{item.likedCount || '赞'}</span>
                </div>
                <div className='i'>
                    <img src={require('../../assets/images/fd_reply.png')}></img>
                    <span>{item.commentCount || '评论'}</span>
                </div>
                <div className='i'>
                    <img src={require('../../assets/images/fd_share.png')}></img>
                </div>
            </div>
        )
    }
}

export default FeidianItemBotton