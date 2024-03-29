import React from 'react';
import {Bar} from 'react-chartjs-2';
import './styles/style.css'
// import DropdownApp from './dropdown/dropdownapp.js'


function Pricetable(props) {
  
  console.log()
  // console.log(props);
  const data = {
    //line for the pricing data
    datasets: [{
    label: 'Spot price in USD',
    type:'line',
    data: props.prices,
    fill: false,
    borderColor: '#cfbd18', 
    // borderColor: '#55cbfa',   
    backgroundColor: '#cfbd18',
    borderJoinStyle: 'miter',
    // backgroundColor: '#f5f5f5',
    pointBorderColor: '#cfbd18',
    pointBackgroundColor: '#cfbd18',
    // pointHoverBackgroundColor: '#EC932F',
    // pointHoverBorderColor: '#EC932F',
    yAxisID: 'y-axis-1',
    }]
  }
    // },{
    // //bar??????? maybe replace this with another line graph to demonstrate volume
    // type: 'bar',
    // label: 'Visitor',
    // data: [200, 185, 590, 621, 250, 400, 95],
    // fill: false,
    // backgroundColor: '#71B37C',
    // borderColor: '#71B37C',
    // hoverBackgroundColor: '#71B37C',
    // hoverBorderColor: '#71B37C',
    // yAxisID: 'y-axis-1'
    // }]
    // };
    
    const options = {
    responsive: false,
    maintainAspectRatio: false,
    labels: props.labels,
    tooltips: {
    mode: 'label'
    },
    elements: {
    line: {
    fill: false

    }
    },
    scales: {
    
    xAxes: [
      {
        display: true,
        gridLines: {
          display: true,
          color: '#3a3a3aa4'
        },
    
        labels: props.labels,
      }
    ],
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: true,
          color: '#3a3a3aa4'
        },
        labels: {
          show: true
        }
      },
    ]
    }
    };
    return (
        <div>
            <div className="table">
                <div className="column coin">
                    <span className="columnTitle">Asset</span>
                    {props.labels.map(((data,i) => (
                        <ul key={i}>
                        <li>{data} </li>
                        <hr align="center" width="100%"></hr>
                        </ul>
                    )))}
                </div>
                <div className="column price">
                    <span className="columnTitle">Spot price</span>
                    {props.prices.map(((data, i) => (
                        <ul key={i}>
                        <li>{data} </li>
                        <hr align="center" width="100%"></hr>
                        </ul>
                    )))}
                </div>
            </div>
         
        </div>
    );
  }
  
  export default Pricetable;