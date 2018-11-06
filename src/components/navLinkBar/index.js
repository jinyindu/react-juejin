import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
@withRouter
class NavLinkBar extends React.Component{
    constructor(props){
        super(props)
    }
    static propTypes = {
        data: PropTypes.array.isRequired
    };

    render(){
        const navList = this.props.data
        const {pathname} = this.props.location

        return (
            <TabBar 
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white">
                {
                    navList.map(v=>(
                        <TabBar.Item
                          key={v.path}
                          title={v.title}
                          icon={{ uri: require(`../../assets/images/tab_${v.icon}_normal.png`) }}
                          selectedIcon = {{ uri: require(`../../assets/images/tab_${v.icon}.png`) }}
                          selected = { pathname==v.path }
                          onPress={()=>{
                            this.props.history.push(v.path)
                          }}
                        ></TabBar.Item>
                    ))
                }
            </TabBar>
        )
    }
}

export default NavLinkBar