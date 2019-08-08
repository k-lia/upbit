import React, { Component } from "react";
import axios from 'axios';
import moment from 'moment';
import PricingGraph from '../components/PricingGraph'
import {Container, Row, Col} from '../components/Grid'

import API from '../utils/API';

/**
 * Axios call to retrieve data 
 * Nested axios call, maybe coinbase updates their api to add currencies so we
 * Retrieve it from the initial spot prices
 * 
 * 
 */
// let historicalData = () => {

// }
let filterOutliers = (someArray) => {

    if(someArray.length < 4)
      return someArray;
  
    let values, q1, q3, iqr, maxValue, minValue;
  
    values = someArray.slice().sort( (a, b) => a - b);//copy array fast and sort
  
    if((values.length / 4) % 1 === 0){//find quartiles
      q1 = 1/2 * (values[(values.length / 4)] + values[(values.length / 4) + 1]);
      q3 = 1/2 * (values[(values.length * (3 / 4))] + values[(values.length * (3 / 4)) + 1]);
    } else {
      q1 = values[Math.floor(values.length / 4 + 1)];
      q3 = values[Math.ceil(values.length * (3 / 4) + 1)];
    }
  
    iqr = q3 - q1;
    maxValue = q3 + iqr * 1.5;
    minValue = q1 - iqr * 1.5;
  
    return values.filter((x) => (x >= minValue) && (x <= maxValue));
  }

class Pricing extends Component {
    state = {
        labels: [],
        prices: [],
        noOutliersprices: [],
        noOutlierslabels: [],
        allSpotPrices: []
    }
    retrieveHistoricalData = () => {
        // 2016-01-01T00:00:00-06:00
        let data = API.getHistoricalData();
        API.getDummyData();
        // console.log(data);
        
    }
    retrieveSpotPrices = () => {
        axios.get(`https://api.coinbase.com/v2/prices/USD/spot`)
        .then(res => {
            // console.log(res.data);
            let data = res.data.data;
            let labels = [];
            let prices = [];
            let coin = {};
            let coins = [];
            // console.log(data);
            for(let i = 0; i < data.length; i++){
                labels.push(data[i].base);
                prices.push(parseFloat(data[i].amount));
                coins.push({label: data[i].base, price: data[i].amount});
            }
            // console.log(coins);

            // console.log(this.state.allSpotPrices);

            let filterArray = [];
            let maxValue = parseFloat(coins[0].price);
            // for (const price in coins) {
            //     if (price > maxValue) {
            //         maxValue = price;
            //     }
            // }

            for(let i = 1; i < coins.length; i++){
                if(parseFloat(coins.price) > maxValue){
                    maxValue = parseFloat(coins.price);
                }
                else{
                    filterArray.push(coins[i]);
                }
            }
            let result = coins.map(({ label }) => label) //this works
            // console.log("Labels: "+result);
            //   let filtered = prices.filter(function (str) { return str.includes(PATTERN); });
            
            this.setState({
                prices: prices,
                labels: labels,
                allSpotPrices: coins,
                noOutlierslabels: filterArray.map(({ label }) => label),
                noOutliersprices: filterArray.map(({ price }) => price)
              });
        })        
    }


    /*** RENDERING FUNCTIONS */
    componentDidMount() {
        this.retrieveSpotPrices();
        this.retrieveHistoricalData();
    }

    render (){
        return (
                <Container fluid>
                    <Row>
                        <Col size="md-6">
                            <PricingGraph
                                labels= {this.state.labels}
                                prices= {this.state.prices}
                            />
                        </Col>
                        <Col size="md-6">
                            <PricingGraph
                                labels= {this.state.noOutlierslabels}
                                prices= {this.state.noOutliersprices}
                            />
                        </Col>
                    </Row>
                </Container>
        );
    }
  }

  export default Pricing;