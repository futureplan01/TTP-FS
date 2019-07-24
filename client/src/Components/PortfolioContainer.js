import React from 'react';
import Portfolio from './Portfolio';
import Header from './Header';

function PortfolioContainer (props){

    return (
        <div>
            <Header/>
            <Portfolio updateAccount={props.updateAccount} vertifyToken={props.vertifyToken} updateTransaction={props.updateTransaction} getAccount={props.getAccount}/>
        </div>
    );
}

export default PortfolioContainer;
