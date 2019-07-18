import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {email:'', password: '',isAuth: false,error: false};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.KeyUp = this.KeyUp.bind(this);
    }
    KeyUp(e){
        
        if(e.key === 'Enter'){
            axios.post('http://localhost:3010/SignIn',{
                crossDomain:true,
                email: this.state.email.toLowerCase(),
                password: this.state.password
            })
            .then((user)=>{
                if(user){
                    this.setState({isAuth: true});
                    this.props.updateAccount(user.data.user_account);
                }
            }).catch((err)=>{
                this.setState({error: true});
            })
        }
    }
    handleEmailChange(e){
        this.setState({ email: e.target.value });
    }
    handlePasswordChange(e){
        this.setState({ password: e.target.value });
    }
    
    render(){
        let ErrorMessage;
        if(this.state.isAuth){
            return(<Redirect to="/portfolio"/>)
        }

        if(this.state.error){
            ErrorMessage = <div className = "center"> 
            <Link to="/Register">Register </Link>
            </div>
        }
        
        
        return (
            <div id='SignInContainer'> 
                <div>
                <h1 id='SignIn' className='center'>Sign In</h1>
                <input placeholder='Email' onChange={this.handleEmailChange} className='input'/>
                <br/>
                <input placeholder='Password' type = 'password' onChange= {this.handlePasswordChange} onKeyPress={this.KeyUp} tabIndex='0' className='input'/>
                </div>
                {ErrorMessage}
            </div>
            
        );
    }
}

export default SignIn;