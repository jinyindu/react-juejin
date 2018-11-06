import React from 'react'

import './feidianTop.less'

class FeidianItemTop extends React.Component{
    constructor(props){
        super(props)
    }
    
    getUrlHostName(url){
        let arrUrl = url.split('//');
        let start = arrUrl[1] ? arrUrl[1].indexOf('/') : arrUrl[0].indexOf('/');
        let relUrl = arrUrl[1] ? arrUrl[1].substring(0, start) : arrUrl[0].substring(0, start);
        return relUrl;
    }

    render(){
        const { item } = this.props
        return (
            <div className="feidian-top">
                <div className="user">
                    <img className='avatar' src={ item.user.avatarLarge || require('../../assets/images/default_avatar.png')}></img>
                    <div className='others'>
                        <div className='l'>
                            <div>{item.user.username}</div>
                            <div className='jobtitle'>
                                <span>{item.user.jobTitle}</span>
                                <span>@ {item.user.company}</span>
                                <span> · </span>
                                <span></span>
                            </div>
                        </div>
                    <div className='r'>
                        <img className='more' src={require('../../assets/images/ic_pin_more.png')}></img>
                    </div>
                    </div>
                </div>
                <div className='content'>{item.content}</div>
                { 
                    item.urlTitle || item.url 
                    ? 
                        <div className='topic'>
                            <div className='desc'>
                                <div>{item.urlTitle}</div>
                                <div className='url'>{this.getUrlHostName(item.url)}</div>
                            </div>
                            { item.urlPic ? <img src={item.urlPic}></img> : '' }
                        </div> 
                    :''
                }
                {
                    item.pictures && item.pictures.length ?
                    <div className='pictures'>
                        {
                            item.pictures.length>=2 ? 
                            item.pictures.map((item,index) =>(
                                <div className='picture' key={index}>
                                    <img src={item} style={{ height:228}}></img>
                                </div>
                            )) : ''
                        }
                        {
                            item.pictures.length==1 ?
                            <div className='picture'>
                                <img src={item.pictures[0]}></img>
                            </div>: ''
                        }
                        
                    </div> : ''
                }
                
                { item.topic && item.topic.title ?  <div className='tag'>{item.topic.title}</div>: ''}
               
            </div>
        )
    }
}

export default FeidianItemTop