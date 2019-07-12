import React from 'react';
import { Route, Switch } from "react-router-dom";
import logo from './logo.svg';

// COMPONENTS
import SignIn from './Components/SignIn';
import Portfolio from './Components/Portfolio';
import Transactions from './Components/Transactions';
import Register from './Components/Register';

function App() {
  return (
    <Switch>
      <Route exact path = "/" component={SignIn} />
      <Route exact path = "/" component={Portfolio} />
      <Route exact path = "/" component={Transactions} />
      <Route exact path = "/" component={Register} />
    </Switch>
  );
}

export default App;
