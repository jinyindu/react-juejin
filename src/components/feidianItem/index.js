import React from 'react'
import PropsTypes from 'prop-types'

//引入子组件
import FeidianItemTop from './feidianItemTop'
import FeidianItemBotton from './feidianItemBotton'

import './index.less'

class FeidianItem extends React.Component{
    static propsTypes = {
        details: PropsTypes.object.isRequired
    }
    constructor(props){
        super(props)
    }

    componentDidMount(){
        
    }

    render(){
        const { details } = this.props
        return(
            <div className="item">
                <FeidianItemTop item ={details}></FeidianItemTop>
                <FeidianItemBotton item ={details}></FeidianItemBotton>
            </div>
        )
    }
}

export default FeidianItem