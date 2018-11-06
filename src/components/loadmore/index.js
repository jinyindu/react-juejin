import React from 'react'
import './index.less'

class LoadMore extends React.Component{
    constructor(props){
        super(props)
    }
    
    loadMoreHandle() {
        this.props.loadMoreFn();
    }
    componentDidMount(){
        const loadMoreFn = this.props.loadMoreFn
        const wrapper = this.refs.wrapper
        let timeoutId
        function callback() {
            const top = wrapper.getBoundingClientRect().top
            const windowHeight = window.screen.height
            if (top && top < windowHeight) {
                loadMoreFn()
            }
        }

        window.addEventListener('scroll', function () {
            if (this.props.isLoadingMore) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 50)
        }.bind(this), false);
    }

    render(){
        return(
            <div className="loadMore" ref="wrapper">
                {
                    this.props.isLoadingMore ? <div><span className="loading"></span>加载中</div> : null
                }
            </div>
        )
    }
}

export default LoadMore