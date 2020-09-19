import React,{Component} from 'react';
import {fire,authui_init} from '../../config/Firebase';


class Login extends Component{
    componentDidMount = ()=>{
        authui_init()
    }
    render(){
        return (
            <>
            <h1>Login page</h1>
            <div id="firebaseui-auth-container">

            </div>
            </>
        )
    }
}

export default Login;