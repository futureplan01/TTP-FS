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
    this.state = { Transaction: [], User: {email:'',account: 0}};
    this.updateTransaction = this.updateTransaction.bind(this);
    this.updateAccount = this.updateAccount.bind(this);
    this.getAccount = this.getAccount.bind(this);
    this.getTransaction = this.getTransaction.bind(this);
    this.updateUser=this.updateUser.bind(this);
  }
  updateUser(x){
    this.setState({User:x});
  }
  updateTransaction(x){
    console.log(x);
  }
  updateAccount(x){
    let email = this.state.User.email;
    axios.post('http://localhost:3010/updateAccount',{
      crossDomain:true,
      email: this.state.User.email.toLowerCase(),
      account: this.state.User.account
    }).then((user)=>{
      console.log('HELLOOOOO');
      if(user) {
        console.log("We Made it fam");
        console.log(user);
      }
    })
    .catch((err)=>{console.log(err)})
    this.setState({User:{email:email,account:x}});
  }
  getTransaction(){
    return this.state.Transaction
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
          <Portfolio updateAccount={this.updateAccount} updateTransaction ={this.updateTransaction} getAccount={this.getAccount}/>
        }/>

        <Route exact path = "/Transaction" render={()=>
         <Transaction getTransaction={this.getTransaction}/>
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
