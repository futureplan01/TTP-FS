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
    this.state = {Account: 0, Transaction: []}
    this.updateTransaction = this.updateTransaction.bind(this);
    this.changeAccount = this.changeAccount.bind(this);
  }
  updateTransaction(x){
    let array = this.state.Transaction;
    array.push(x);
    this.setState({Transaction: array});
  }
  changeAccount(x){
    this.setState({Account: x});
  }

  render(){
    return (
      <Switch>
        <Route exact path = "/" component={SignIn} changeAccount = {this.changeAccount} />
        <Route exact path = "/Portfolio" component={Portfolio} changeAccount={this.changeAccount} updateTransaction ={this.updateTransaction} account={this.state.Account}/>
        <Route exact path = "/Transaction" component={Transaction} allTransaction={this.state.Transaction} />
        <Route exact path = "/Register" component={Register} changeAccount ={this.changeAccount}/>
        <Route component = {ErrorPage}/>
      </Switch>
    );
  }
}

export default App;
