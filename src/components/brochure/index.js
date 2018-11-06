import React from 'react'
import { Link } from 'react-router-dom'

import './index.less'
/**
 * 小册
 */
class BrochureItem extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const { item } = this.props
        return (
            <Link to={`/brochure/detail/${item.id}`} className="list">
                <img className="poster" src={item.img}></img>
                <div className="info">
                    <div className="title">{item.title}</div>
                    <div className="author">
                        { item.userData ? item.userData.username: ''}
                    </div>
                    <div className="others">
                        <div>
                        {
                            item.isFinished ? 
                                <div>
                                    <span>预售.</span>
                                    <span className="isFinished">
                                        {item.lastSectionCount}小节 {item.buyCount}人已购买
                                    </span>
                                </div> : null
                        }
                        </div>
                    </div>
                </div>
                <div className="price">
                    {
                        !item.timeLimitDiscountFirstDay ?
                        <span>￥{item.price}</span> 
                        : 
                        <span>惠￥{item.price * item.timeLimitDiscountFirstDay.discountCount / 10}</span>
                    }
                </div>
            </Link>
        )
    }
}

export default BrochureItem