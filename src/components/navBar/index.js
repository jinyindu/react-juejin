import React from 'react'
import './index.less'

class NavBar extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="navbar">
                {this.props.title}
            </div>
        )
    }
}

export default NavBar