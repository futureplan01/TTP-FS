import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import logo from './logo.svg';

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
    this.state = {Account: 0, Transaction: []};
    this.updateTransaction = this.updateTransaction.bind(this);
    this.updateAccount = this.updateAccount.bind(this);
    this.getAccount = this.getAccount.bind(this);
    this.getTransaction = this.getTransaction.bind(this);
  }

  updateTransaction(x){
    let array = this.state.Transaction;
    array.push(x);
    this.setState({Transaction: array});
  }
  updateAccount(x){
    this.setState({Account: x});
  }
  getTransaction(){
    return this.state.Transaction
  }
  getAccount(){
    return this.state.Account;
  }


  render(){
    return (
      <Switch>
        <Route exact path = "/" render={()=>
          <SignIn updateAccount={this.updateAccount} />
        } />
        
        <Route exact path = "/Portfolio" render={()=>
          <Portfolio updateAccount={this.updateAccount} updateTransaction ={this.updateTransaction} getAccount={this.getAccount}/>
        }/>

        <Route exact path = "/Transaction" render={()=>
         <Transaction getTransaction={this.getTransaction}/>
        }/>

        <Route exact path = "/Register" render={()=>
         <Register changeAccount={this.changeAccount}/>
        }/>

        <Route component = {ErrorPage}/>
      </Switch>
    );
  }
}

export default App;
