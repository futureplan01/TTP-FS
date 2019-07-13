import React, { Component } from 'react';

class SignIn extends Component{
    render(){
        return (
            <div id='SignInContainer'> 
                <h1 id='SignIn' className='center'>Sign In</h1>
                <input placeholder='Email' className='input center'/>
                <br/>
                <input placeholder='Password' className='input center'/>
            </div>
        );
    }
}

export default SignIn;