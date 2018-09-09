import React, { Component } from 'react';
import { VictoryTheme, VictoryAxis, VictoryChart, VictoryCandlestick } from 'victory';

import weatherData from './data/tempData.json';
import './App.css';

class App extends Component {

  convertData = (data) => {
    return data.map(el => {
      return {
        x: el.year+el.mon+el.day, 
        open: (el.tmax), 
        close: (el.tmin), 
        high: 110, 
        low: -30
      };
    });
  }

  render() {
    return (
      <div className="App">
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 25 }}
          scale={{ x: "time" }}
        >
          <VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`}/>
          <VictoryAxis dependentAxis/>
          <VictoryCandlestick
            candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
            data={
              [
                {x: 20160601, open: 5, close: 10, high: 15, low: 0},
                {x: 20160602, open: 10, close: 15, high: 20, low: 5},
                {x: 20160603, open: 15, close: 20, high: 22, low: 10},
                {x: 20160604, open: 20, close: 10, high: 25, low: 7},
                {x: 20160605, open: 10, close: 8, high: 15, low: 5}
              ]
            }
          />
        </VictoryChart>
      </div>
    );
  }
}

export default App;
