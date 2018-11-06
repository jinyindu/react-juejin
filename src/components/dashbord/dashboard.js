import React from 'react'
import { Switch,Route } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import './index.less'
/** react 路由异步组件加载 */
import asyncComponent from '../../utils/asyncComponent'

import NavLinkBar from '../navLinkBar/index'
//引入组件
const Home = asyncComponent(()=> import('../../container/home/index').then(module => module.default),{ name:'Home' })
const Search = asyncComponent(()=> import('../../container/search/search').then(module => module.default),{ name: 'Search'})
const FeiDian = asyncComponent(()=> import('../../container/feidian/index').then(module => module.default),{ name: 'FeiDian'})
const Brochure = asyncComponent(()=> import('../../container/brochure/brochure').then(module => module.default),{ name: 'Brochure'})
const Profile = asyncComponent(()=> import('../../container/profile/profile').then(module => module.default),{ name: 'Profile'})

class DashBoard extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {pathname} = this.props.location
        //定义底部导航数据
        const navList = [
            {
                path:'/home',
                text:'主页',
                icon:'home',
                title:'掘金',
                component: Home
            },
            {
                path:'/search',
                text:'搜索',
                icon:'explore',
                title:'搜索',
                component: Search
            },
            {
                path:'/feidian',
                text:'沸点',
                icon:'feidian',
                title:'沸点',
                component: FeiDian
            },
            {
                path:'/brochure',
                text:'小册',
                icon:'xiaoce',
                title:'小册',
                component: Brochure
            },
            {
                path:'/profile',
                text:'我的',
                icon:'profile',      
                title:'我的',
                component: Profile
            }
        ]

        return(
            <div>
                <NavBar mode='dard'>{navList.find(v=>v.path==pathname).title}</NavBar>
                <div style={{ paddingBottom:50}}>
                    <Switch>
						{navList.map(v=>(
							<Route key={v.path} path={v.path} component={v.component}></Route>
						))}
					</Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default DashBoard