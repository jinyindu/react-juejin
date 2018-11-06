import React from 'react'

import './index.less'
class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userInfo: {}
        }
    }
    componentWillMount(){
        this.getUserInfo()
    }

    componentDidMount(){
        
    }
    getUserInfo(){
        let user = localStorage.getItem('auth')
        this.setState({
            userInfo: JSON.parse(user).userInfo
        })
    }

    render(){
        const userInfo = this.state.userInfo
        console.log('userInfo',this.state)
        return (
            <div>
                <div className='wrapper'>
                    <div className='card profile' >
                    <div className='info'>
                        {
                            userInfo.avatarLarge ?
                            <img className='avatar' src={userInfo.avatarLarge}></img> :
                            <img className='avatar' src ={ require('../../assets/images/empty_avatar_user.png')}></img>
                        }
                       
                        <div className='text'>
                            <div className='name'>{userInfo.username || '登录/注册'}</div>
                            <div className='company'>{userInfo.jobTitle || '添加职位'} @ {userInfo.company || '添加公司'}</div>
                        </div>
                    </div>
                    <div className='more'>
                        <div className='reddot'></div>
                        <img src={require('../../assets/images/profile_arrow.png')}></img>
                    </div>
                    </div>
                
                    <div className='card items'>
                    <div className='item'>
                        <div className='title'>
                        <img src={require('../../assets/images/ic_notification.png')}></img>
                        <div>消息中心</div>
                        </div>
                        <div className='count reddot'></div>
                    </div>
                    <div className='item'>
                        <div className='title'>
                        <img src={require('../../assets/images/ic_heart_entry_bottom_full.png')}></img>
                        <div>我喜欢的</div>
                        </div>
                        <div className='count'></div>
                    </div>
                    <div className='item'>
                        <div className='title'>
                        <img src={require('../../assets/images/ic_collection_set.png')}></img>
                        <div>收藏集</div>
                        </div>
                        <div className='count'>个</div>
                    </div>
                    <div className='item'>
                        <div className='title'>
                        <img src={require('../../assets/images/user_buy.png')}></img>
                        <div>已购小册</div>
                        </div>
                        <div className='count'>本</div>
                    </div>
                    <div className='item'>
                        <div className='title'>
                        <img src={require('../../assets/images/user_liked_pin.png')}></img>
                        <div>赞过的沸点</div>
                        </div>
                        <div className='count'></div>
                    </div>
                    <div className='item'>
                        <div className='title'>
                        <img src={require('../../assets/images/view.png')}></img>
                        <div>阅读过的文章</div>
                        </div>
                        <div className='count'>篇</div>
                    </div>
                    <div className='item'>
                        <div className='title'>
                        <img src={require('../../assets/images/view.png')}></img>
                        <div>标签管理</div>
                        </div>
                        <div className='count'>个</div>
                    </div>
                    </div>
                
                    <div className='card items'>
                    <div className='item'>
                        <div className='title'>
                        <img src={require('../../assets/images/icon_feed_back.png')}></img>
                        <div>意见反馈</div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='title'>
                        <img src={require('../../assets/images/settings.png')}></img>
                        <div>设置</div>
                        </div>
                    </div>
                    </div>  
                </div>
            </div>
        )
    }
}

export default Profile