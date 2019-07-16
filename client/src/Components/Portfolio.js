import React, { Component } from 'react';

class Portfolio extends Component{
    render(){
        return (
            <div>
            <h1 id='Portfolio'> Portfolio</h1>
            <div className = 'split'>
                <div id= 'PortfolioContainer'>
                    <div>
                        Yadadadad
                    </div>
                </div>
                <div id='PurchaseContainer'>
                    <div>
                        <div id='Purchase'>Cash - </div>
                        <br/>
                        <input className = 'input'/>
                        <br/>
                        <input className = 'input'/>
                        <br/>
                        <button className = 'button'> BUY</button>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Portfolio;





