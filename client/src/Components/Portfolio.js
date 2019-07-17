import React, { Component } from 'react';
import axios from 'axios';
import jsonp from 'jsonp';

class Portfolio extends Component{
    
    constructor (props){
        super();
        this.state = {stockArray: []};
        this.getStocks = this.getStocks.bind(this);
    }
    getStocks(){
        jsonp('https://ws-api.iextrading.com/1.0/tops/last',null,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                console.log(data);
                this.setState({stockArray: data});
            }
        })
    }
    render(){
        if(this.state.stockArray.length ==0)
            this.getStocks();
        return (
            <div>
            <h1 id='Portfolio'> Portfolio</h1>
            <div id='Portfolio'>Symbol, Price, Stock</div>
            <div className = 'split'>
                <div id= 'PortfolioContainer'>
                    <div>
                    {this.state.stockArray.map((stock,num)=>{
                         return(
                         <div key={num}>
                                <span className ='stock'>{stock.symbol}</span>,
                                <span className ='stock'>{stock.price}</span>,
                                <span className ='stock'>{stock.size}</span>
                            </div>)
                        })}
                    </div>
                </div>
                <div id='PurchaseContainer'>
                    <div>
                        <div id='Purchase'>Cash - {this.props.account}</div>
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





