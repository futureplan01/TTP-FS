import React, { Component } from 'react';

class Register extends Component{
    render(){
        return (
        <div id = 'SignInContainer'> 
            <div>
            <h1 className='center'>Register</h1>
            <input placeholder = 'Name' className='input'/>
            <br/>
            <input placeholder = 'Email' className='input'/>
            <br/>
            <input placeholder = 'Password' className='input'/>
            <br/>
            <input placeholder = 'Confirm Password' className='input'/>
            </div>
        </div>);
    }
}

export default Register;