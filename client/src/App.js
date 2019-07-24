import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import axios from 'axios';

// COMPONENTS
import SignIn from './Components/SignIn';
import Portfolio from './Components/PortfolioContainer';
import Transaction from './Components/TransactionContainer';
import Register from './Components/Register';

function ErrorPage(){
  return (<div>
    <h3>No match for <code>{window.location.href }</code></h3>
  </div>)
}

class App extends Component {
  constructor (){
    super();
    this.state = { Transaction: [], User: {email:'',account: 0, transaction: []}};
    this.updateTransaction = this.updateTransaction.bind(this);
    this.updateAccount = this.updateAccount.bind(this);
    this.getAccount = this.getAccount.bind(this);
    this.getTransaction = this.getTransaction.bind(this);
    this.vertifyToken = this.vertifyToken.bind(this);
    this.updateUser=this.updateUser.bind(this);
  }
  updateUser(x){
    console.log(x.token);
    // how do I know when it works?
    localStorage.setItem('token', x.token);
    this.setState({User:x});
  }

  vertifyToken(){
    let value = localStorage.getItem('token');
    if(!value) {
      console.log("No Token")
      //return false;
    }

    axios.post('http://localhost:3010/vertifyToken',{
      crossDomain:true,
      token:value
    })
    .then((user)=>{
      console.log(user);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  updateTransaction(x){
    axios.post('http://localhost:3010/updateTransaction',{
      crossDomain:true,
      email: this.state.User.email.toLowerCase(),
      transaction: x
    }).then((user)=>{
      if(user) {
        let email = this.state.User.email;
        let account = this.state.User.account;
        this.setState({User:{email:email,account:account,transaction:user.data.transaction}});
      }
    })
    .catch((err)=>{console.log(err)})
  }

  updateAccount(x){
    console.log()
    let email = this.state.User.email;
    axios.post('http://localhost:3010/updateAccount',{
      crossDomain:true,
      email: this.state.User.email.toLowerCase(),
      account: x
    })
    .then((user)=>{
      console.log("Updated Account Completed");
      if(user) {
        console.log(user);
      }
    })
    .catch((err)=>{console.log(err)})

    this.setState({User:{email:email,account:x}});
  }

  getTransaction(){
    return this.state.User.transaction;
  }
  getAccount(){
    return this.state.User.account;
  }


  render(){
    return (
      <Switch>
        <Route exact path = "/" render={()=>
          <SignIn updateAccount={this.updateAccount} updateUser={this.updateUser}/>
        } />
        
        <Route exact path = "/Portfolio" render={()=>
          <Portfolio updateAccount={this.updateAccount} vertifyToken={this.vertifyToken} updateTransaction ={this.updateTransaction} getAccount={this.getAccount}/>
        }/>

        <Route exact path = "/Transaction" render={()=>
         <Transaction  getTransaction={this.getTransaction}/>
        }/>

        <Route exact path = "/Register" render={()=>
         <Register />
        }/>

        <Route component = {ErrorPage}/>
      </Switch>
    );
  }
}

export default App;
