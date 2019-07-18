import React, { Component } from 'react';
import jsonp from 'jsonp';

class Portfolio extends Component{
    
    constructor (props){
        super(props);
        this.state = {stockArray: [], symbol: '', price:0,size: 1};
        this.getStocks = this.getStocks.bind(this);
        this.stockClick = this.stockClick.bind(this);
        this.buyStock = this.buyStock.bind(this);
    }
    getStocks(){
        jsonp('https://ws-api.iextrading.com/1.0/tops/last',null,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                this.setState({stockArray: data});
            }
        })
    }
    buyStock(e){
        if(!e.target.value == ''){
            let newPrice = this.state.price;
            newPrice *= e.target.value;
            this.setState({size: e.target.value, price: newPrice})
        }else{
            this.setState({size: e.target.value})
        }
    }
    // Symbol Price Stock
    stockClick(e){
        let values = e.currentTarget.textContent;
        let array = values.split(',');
        this.setState({symbol: array[0], price:array[1]});

    }
    componentDidMount(){

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
                             <div className='stockContainer' onClick={this.stockClick}>
                                <span id ='stockSymbol'className ='stock symbol'>{stock.symbol}</span>,
                                <span  className ='stock price'>{stock.price}</span>,
                                <span  className ='stock size'>{stock.size}</span>
                            </div>
                            </div>)
                        })}
                    </div>
                </div>
                <div id='PurchaseContainer'>
                    <div>
                        <div id='Purchase'>Cash - {this.props.getAccount()}</div>
                        <br/>
                        <input value ={this.state.price} className = 'input'/>
                        <br/>
                        <input onChange={this.buyStock} value={this.state.size} className = 'input'/>
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





