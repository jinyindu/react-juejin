import React from 'react'
import { Button,WhiteSpace,Toast } from 'antd-mobile';
import { connect } from 'react-redux'
import * as login from '../../actions/login/login.action'
import './index.less'

@connect(
    state => ({ login: state.login }),
    {
        ...login
    }
)
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            phoneNumber:'',
            password:''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key] : val.target.value
        })
     }

    handleSubmit(){
        
        if(!this.state.phoneNumber.replace(/\s+/g, '')){
            Toast.info('请输入邮箱/手机号')
            return;
        }

        if(!this.state.password.replace(/\s+/g, '')){
            Toast.info('请输入密码')
            return;
        }
        let params = {}
        if(this.state.phoneNumber.indexOf('@')!==-1){
            params = {
                email: this.state.phoneNumber,
                password: this.state.password
            }
            this.props.loginOfEmail(params).then(res => {
                let auth = {
                    token: res.data.token,
                    uid: res.data.userId,
                    clientId: res.data.clientId,
                    userInfo: res.data.user
                }
                localStorage.setItem('auth',JSON.stringify(auth))
                Toast.success('登录成功')
                this.props.history.goBack()
            })
        }else{
            params = {
                phoneNumber: this.state.phoneNumber,
                password: this.state.password
            }
            this.props.LoginOfPhone(params).then(res => {
                let auth = {
                    token: res.data.token,
                    uid: res.data.userId,
                    clientId: res.data.clientId,
                    userInfo: res.data.user
                }
                localStorage.setItem('auth',JSON.stringify(auth))
                Toast.success('登录成功')
                this.props.history.goBack()
            })
        }
    }

    render(){
        return(
            <div className="wrapper">
                <div className="top">
                    <div className="logo">
                        <img src={ require('../../assets/images/logo.png') }></img>
                    </div>
                    <form className="form">
                        <div className="formBox">
                            <div className="item">
                                <div className="input_item">
                                    <input type="text" name="phoneNumber" placeholder="邮箱/手机号" onChange={v=>this.handleChange('phoneNumber',v)}></input>
                                </div>
                            </div>
                            <div className="item pwd">
                                <div className="input_item">
                                    <input type="password" name="password" placeholder="密码" onChange={v=>this.handleChange('password',v)}></input>
                                </div>
                            </div>
                        </div>
                        <div className="login">
                            <WhiteSpace /> 
                            <WhiteSpace />
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </div>
                    </form>
                </div>
                <div className='footer'>掘金·juejin.im</div>
            </div>
        )
    }
}

export default Login

