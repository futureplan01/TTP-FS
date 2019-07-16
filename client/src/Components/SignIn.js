import React, { Component } from 'react';

class SignIn extends Component{
    render(){
        return (
            <div id='SignInContainer'> 
                <div>
                <h1 id='SignIn' className='center'>Sign In</h1>
                <input placeholder='Email' className='input'/>
                <br/>
                <input placeholder='Password' className='input'/>
                </div>
            </div>
        );
    }
}

export default SignIn;