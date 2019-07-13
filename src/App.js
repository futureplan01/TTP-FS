import React from 'react';
import { Route, Switch } from "react-router-dom";
import logo from './logo.svg';

// COMPONENTS
import SignIn from './Components/SignIn';
import Portfolio from './Components/PortfolioContainer';
import Transaction from './Components/TransactionContainer';
import Register from './Components/Register';

function App() {
  return (
    <Switch>
      <Route exact path = "/" component={SignIn} />
      <Route exact path = "/Portfolio" component={Portfolio} />
      <Route exact path = "/Transaction" component={Transaction} />
      <Route exact path = "/Register" component={Register} />
    </Switch>
  );
}

export default App;
