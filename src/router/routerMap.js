import React from 'react'
import { 
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

/** react 路由异步组件加载 */
import asyncComponent from '../utils/asyncComponent';

/** 引入组件 */
const Launch = asyncComponent(()=>import('../container/launch/launch').then(module => module.default),{name:'Launch'})
const DashBoard = asyncComponent(()=> import('../components/dashbord/dashboard').then(module => module.default),{ name:'DashBoard' })
const Login = asyncComponent(()=>import('../container/login/login').then(module => module.default),{name:'Login'})
const brochureDetail = asyncComponent(()=>import('../container/brochure/brochureDetail').then(module => module.default),{name:'brochureDetail'})
const postDetail = asyncComponent(()=>import('../container/post/post').then(module => module.default),{name:'brochureDetail'})

class RouterMap extends React.Component{
    constructor(props,context){
        super(props,context)
        this.state = {
            initialDone: true
        }
    }
    render(){
        let Routes = (
            <Switch>
                <Route exact path="/" component = { Launch }></Route>
                <Route path="/login" component = { Login }></Route>
                <Route path="/brochure/detail/:id" component = { brochureDetail}></Route>
                <Route path="/post/detail/:postId" component = { postDetail}></Route>
                <Route component = { DashBoard }></Route>
            </Switch>
        )
        return (
            <Router>
                <div>{ this.state.initialDone ? Routes : (<div>加载中...</div>) } </div>
            </Router>
        )
    }
}

export default RouterMap