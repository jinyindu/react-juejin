import React from 'react'
import { connect } from 'react-redux'

import { isLogin } from '../../utils/utils'
import * as brochure from '../../actions/brochure/brochure.action'

import './index.less'
import { compose } from 'C:/Users/Administrator/AppData/Local/Microsoft/TypeScript/3.1/node_modules/redux';

@connect(
    state => state.brochure,
    { ...brochure }
)
class BrochUreDetail extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const auth = isLogin()
        const query = this.props.match.params
        let params = {
            src: 'web',
            uid: auth.uid || '',
            client_id: auth.clientId,
            token: auth.token,
            id: query.id
        }
        this.getAuthorDetail(params)
        this.getListSection(params)
    }

    getAuthorDetail(params){
        this.props.getAuthorDetail(params)
    }
    getListSection(params){
        this.props.getListSection(params)
    }

    render(){
        const { authorDetail,sectionData} = this.props

        return (
            <div>
                {
                    authorDetail ? 
                    <div>
                        <div className='author'>
                        <img className='poster' src={authorDetail.img}></img>
                        <div className='content'>
                            <div className='xiaoceTitle'>{authorDetail.title}</div>
                            <div className='desc'>{authorDetail.desc}</div>
                            <div className='user'>
                                <img className='avatar' src={authorDetail.userData && authorDetail.userData.avatarLarge}></img>
                                <div className='name'>{authorDetail.userData && authorDetail.userData.username}</div>
                            </div>
                        </div>
                    </div>
                    <div className='buy'>
                        <img src={ require('../../assets/images/ic_xiaoce_bought.png') }></img>
                        <div className='count'>{authorDetail.buyCount}人已购买</div>
                    </div>
                    </div> :''
                }
                <div className='heading'>小册内容</div>
                <div className='sections'>
                    {
                        sectionData ? 
                         sectionData.map((item,index) => (
                            <div className='section' key={item._id}>
                                <div className='num'>{index+1}</div>
                                <div className='info'>
                                    <div className='title'>{item.title}</div>
                                    <div className='others'>阅读时长：{item.contentSize} {item.pv}次学习</div>
                                </div>
                                <div className='action'>
                                {
                                    item.isFree ? <div>试读</div> : <img className='lock' src={require('../../assets/images/ic_xiaoce_lock.png')}></img>
                                }
                                </div>
                            </div>
                         )) : ''
                    }
                </div>
            </div>
            
        )
    }
}

export default BrochUreDetail