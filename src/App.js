import React from 'react'

/** 引入路由组件 */
import RouterMap from './router/routerMap'

class App extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className ="app">
                <RouterMap />
            </div>
        )
    }
}

export default App