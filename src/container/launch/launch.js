import React from 'react'
import { isLogin } from '../../utils/utils'

import './index.less'

class Launch extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        let timer = setTimeout(() => {
            clearTimeout(timer)
            this.redirect()
        },2000)
    }
    redirect(){
        const auth = isLogin()
        let url = '/feidian'
        if(auth){
            url = '/home'
        }
        this.props.history.push(url)
    }

    render(){
        return (
            <div className="container">
                <div className="top">
                    <div className="wrapper">
                        <img className="logo" src={ require('../../assets/images/launch_diamond.png') }></img>
                        <div className="txt">相信科技的力量</div>
                    </div>
                </div>
                <div className="bottom">
                    <img src={ require('../../assets/images/launch_bottom.png') }></img>
                </div>
            </div>
        )
    }
}

export default Launch