import React, { Component } from 'react';
import jsonp from 'jsonp';

class Portfolio extends Component{
    
    constructor (props){
        super(props);
        this.state = {stockArray: [], symbol: '', price:0,size: 1,error:false};
        this.getStocks = this.getStocks.bind(this);
        this.stockClick = this.stockClick.bind(this);
        this.selectStock = this.selectStock.bind(this);
        this.buyStock = this.buyStock.bind(this);
    }
    buyStock(){
        if(this.state.price > this.props.getAccount()|| !Number.isInteger(this.state.value) ){
            this.setState({error:true});
        }else{
            // Buy the Stock

        }
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
    selectStock(e){
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
    ErrorMessage(){

    }
    render(){
        let ErrorMessage;
        if(this.state.error){
            ErrorMessage = <div> 
                Please Make Sure You Have An is Integer And Enough Cash!
            </div>
        }
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
                        <input readOnly value ={this.state.price} className = 'input'/>
                        <br/>
                        <input onChange={this.selectStock} value={this.state.size} className = 'input'/>
                        <br/>
                        <button className = 'button'> BUY</button>
                    </div>
                    {ErrorMessage}
                </div>
            </div>
            </div>
        );
    }
}

export default Portfolio;





