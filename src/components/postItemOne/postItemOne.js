import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import { toPostDetail } from '../../utils/utils'
import './index.less'

@withRouter
class PostItemOne extends React.Component{
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
        const { data }  = this.props 
        return (
            <div>
            {
                data.map(v=>(
                    <div className="item hot" onClick={()=>this.onGoPostDetail(v)} key={v.objectId}>
                        <div className='content'>
                            <div className='title'>{v.title}</div>
                            <div className='labels'>
                            <div className='label'>
                                <img src={ require('../../assets/images/ic_collection.png') }></img>
                                <div>{v.collectionCount || '喜欢'}</div>
                            </div>
                            <div className='label'>
                                <img src={ require('../../assets/images/home_hot.png')}></img>
                                <div>{v.user.username}</div>
                            </div>
                            <div className='label'>
                                <img src={require('../../assets/images/ic_time.png')}></img>
                                <div></div>
                            </div>
                            </div>
                        </div>
                        {
                            v.screenshot ? 
                            <img className='inset' src={v.screenshot}></img> : null
                        }
                    </div>
                ))  
            }
            </div>
        )
    }
}

export default PostItemOne