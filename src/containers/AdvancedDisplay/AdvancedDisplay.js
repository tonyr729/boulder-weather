import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { 
  VictoryChart, 
  VictoryTheme, 
  VictoryLine, 
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer 
} from 'victory';

import { addAllData, addVictoryData } from '../../actions';
import './AdvancedDisplay.css';

class AdvancedDisplay extends Component {
  constructor() {
    super();
    this.state = {}
  }

  async componentDidMount(){
    this.getYearlyAverages(await this.dataCheck())
  }

  dataCheck = async () => {
    let allData = null;

    if (!this.props.allData.length) {
      const url = 'http://localhost:3001/api/v1/all';
      const response = await fetch(url);
      const allData = await response.json();
      
      this.props.addAllData(allData.weather);
      return allData.weather;
    }

    allData = this.props.allData;
  
    return allData;
  }

  getYearlyAverages = (data) => {
    const averages = data.reduce((averages, day) => {
      if (!averages[day.year]) {
        averages[day.year] = {
          tmax: day.tmax, 
          tmin: day.tmin, 
          snow: day.snow,
          snowcover: day.snowcover,
          precip: day.precip
        }
      } else {
        averages[day.year].tmax += day.tmax;
        averages[day.year].tmin += day.tmin;
        averages[day.year].snow += day.snow;
        averages[day.year].snowcover += day.snowcover;
        averages[day.year].precip += day.precip;
      }

      return averages;
    }, {});

    
    Object.keys(averages).forEach(year => {
      Object.keys(averages[year]).forEach(stat => {
        averages[year][stat] = Math.round((averages[year][stat] / 365) * 10) / 10;
      });
    });

    this.convertForVictoryXY(averages)
  }

  convertForVictoryXY = (averages) => {
    const tmaxList = this.tmaxVictoryXY(averages);
    const tminList = this.tminVictoryXY(averages);
    const snowList = this.snowVictoryXY(averages);
    const snowcoverList = this.snowcoverVictoryXY(averages);
    const precipList = this.precipVictoryXY(averages);

    const victoryObject = {
      tmax: tmaxList,
      tmin: tminList,
      snow: snowList,
      snowcover: snowcoverList,
      precip: precipList
    };

    this.props.addVictoryData(victoryObject);
  }

  tmaxVictoryXY = (averages) => {
    const tmaxList = Object.keys(averages).map(year => {
      return {x: parseInt(year), y: averages[year].tmax, label: `${parseInt(year)}: ${averages[year].tmax}`}
    });

    return tmaxList;
  }

  tminVictoryXY = (averages) => {
    const tminList = Object.keys(averages).map(year => {
      return {x: parseInt(year), y: averages[year].tmin, label: `${parseInt(year)}: ${averages[year].tmin}`}
    });

    return tminList;
  }

  snowVictoryXY = (averages) => {
    const snowList = Object.keys(averages).map(year => {
      return {x: parseInt(year), y: averages[year].snow, label: `${parseInt(year)}: ${averages[year].snow}`}
    });
    return snowList;
  }

  snowcoverVictoryXY = (averages) => {
    const snowcoverList = Object.keys(averages).map(year => {
      return {x: parseInt(year), y: averages[year].snowcover, label: `${parseInt(year)}: ${averages[year].snowcover}`}
    });

    return snowcoverList;
  }

  precipVictoryXY = (averages) => {
    const preipList = Object.keys(averages).map(year => {
      return {x: parseInt(year), y: averages[year].precip, label: `${parseInt(year)}: ${averages[year].precip}`}
    });

    return preipList;
  }

  render() {
    return (
      <div className="advanced-display">
        <p>Averaged weather data per year.</p>
        <p>
          <span className="max-temp"> Maxium temp in °f </span> -
          <span className="min-temp"> Minimum temp in °f  </span> -
          <span className="snowcover"> Snow cover on ground precise
          to the nearest inch  </span> -
          <span className="snowfall"> Snowfall is precise to 1/10 inch</span>
        </p>
        <p>Note: Snow cover and snow fall data was not collected until 1948. Averaged yearly precipitation was 0 and was not included.</p>
        <VictoryChart
          width={1000}
          height={600}
          theme={VictoryTheme.material}
          // domain={{x: [1900, 2018], y: [-10, 110]}}
          // domainPadding={{x: [0, 0], y: 1}}
          containerComponent={
            <VictoryVoronoiContainer/>
          }
        >
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1900, 1920, 1940, 1960, 1980, 2000]}
            tickFormat={["1900", "1920", "1940", "1960", "1980", "2000"]}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => x}
          />
          <VictoryLine
            labelComponent={<VictoryTooltip />}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{
              data: { stroke: "#2f4ac2", strokeWidth: 1 },
              parent: { border: "1px solid #ccc"}
            }}
            data={this.props.victoryData.snow}
          />
          <VictoryLine
            labelComponent={<VictoryTooltip />}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{
              data: { stroke: "#fffff0", strokeWidth: 1 },
              parent: { border: "1px solid #ccc"}
            }}
            data={this.props.victoryData.snowcover}
          />
          <VictoryLine
            labelComponent={<VictoryTooltip />}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{
              data: { stroke: "#74ccf4", strokeWidth: 1 },
              parent: { border: "5px solid #ccc"}
            }}
            data={this.props.victoryData.precip}
          />
          <VictoryLine
            labelComponent={<VictoryTooltip />}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{
              data: { stroke: "#429bb8", strokeWidth: 1 },
              parent: { border: "1px solid #ccc"}
            }}
            data={this.props.victoryData.tmin}
          />
          <VictoryLine
            labelComponent={<VictoryTooltip />}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{
              data: { stroke: "#c43a31", strokeWidth: 1 },
              parent: { border: "1px solid #ccc"}
            }}
            data={this.props.victoryData.tmax}
          />
        </VictoryChart>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  allData: state.allData,
  victoryData: state.victoryData
});

export const mapDispatchToProps = (dispatch) => ({
  addAllData: (allData) => dispatch(addAllData(allData)),
  addVictoryData: (victoryData) => dispatch(addVictoryData(victoryData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdvancedDisplay));



    // let tmax;

    // if (this.props.victoryData.tmax) {
    //   tmax = this.props.victoryData.tmax.map(year => {
    //     console.log(year)
    //     return (
    //       <div>
    //         <p>{year.x}</p>
    //         <p>{year.y}</p>
    //       </div>
    //     )
    //   })
    // }