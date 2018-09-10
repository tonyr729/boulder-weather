import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addCurrentYearData } from '../../actions';
import './GeneralDisplay.css';

class GeneralDisplay extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      averages: null
    }
  }

  componentDidMount(){
    this.getCurrentYear()
  }

  getCurrentYear = async () => {
    const currentYear = (new Date()).getFullYear();
    const url = `http://localhost:3001/api/v1/year/2017`;
    const response = await fetch(url);
    const currentYearData = await response.json();
    this.getAverages(currentYearData.year)
    
    this.props.addCurrentYearData(currentYearData.year);
  }

  getAverages = (data) => {
    const averagesTotal = {
      jan: this.getMonthAverage(data.filter(el => el.mon === 1)),
      feb: this.getMonthAverage(data.filter(el => el.mon === 2)),
      mar: this.getMonthAverage(data.filter(el => el.mon === 3)),
      apr: this.getMonthAverage(data.filter(el => el.mon === 4)),
      may: this.getMonthAverage(data.filter(el => el.mon === 5)),
      jun: this.getMonthAverage(data.filter(el => el.mon === 6)),
      jul: this.getMonthAverage(data.filter(el => el.mon === 7)),
      aug: this.getMonthAverage(data.filter(el => el.mon === 8)),
      sep: this.getMonthAverage(data.filter(el => el.mon === 9)),
      oct: this.getMonthAverage(data.filter(el => el.mon === 10)),
      nov: this.getMonthAverage(data.filter(el => el.mon === 11)),
      dec: this.getMonthAverage(data.filter(el => el.mon === 12)),
    };
    
    if(!this.state.isLoaded) {
      this.setState({
        isLoaded: true,
        averages: averagesTotal
      });
    }

    return averagesTotal;
  }

  getMonthAverage = (monthData) => {
    const days = monthData.length
    const averages = monthData.reduce((averages, day) => {
      averages.tmax += day.tmax;
      averages.tmin += day.tmin;
      averages.snow += day.snow;

      return averages;
    }, {tmax: 0, tmin: 0, snow: 0})

    averages.tmax = Math.round((averages.tmax / days) * 10) / 10;
    averages.tmin = Math.round((averages.tmin / days) * 10) / 10;
    averages.snow = Math.round((averages.snow / days) * 10) / 10;
    
    return averages
  }

  render() {
    let year;
    let janHigh;
    if (this.props.currentYearData.length) {
      year = this.props.currentYearData[0].year
      janHigh = this.state.averages.jan.tmax
    }
    return (
      <div className="GeneralDisplay">
        <div className="timeframe-container">
          <button className="btn-current">This Year</button>
          <button className="btn-previous">Previous Year</button>
          <button className="btn-pastfive">Past 5 Years</button>
        </div>
        <div className="months-display">
        </div>
        <p>Typical weather in {year}.</p>
        <p>January's average high is {janHigh}</p>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  currentYearData: state.currentYearData
});

export const mapDispatchToProps = (dispatch) => ({
  addCurrentYearData: (currentYearData) => dispatch(addCurrentYearData(currentYearData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GeneralDisplay));


