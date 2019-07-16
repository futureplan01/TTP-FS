import React from 'react';
import Portfolio from './Portfolio';
import Header from './Header';

function PortfolioContainer (props){
    return (
        <div>
            <Header/>
            <Portfolio/>
        </div>
    );
}

export default PortfolioContainer;