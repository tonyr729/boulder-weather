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
    const url = `http://localhost:3001/api/v1/year/${currentYear}`;
    const response = await fetch(url);
    const currentYearData = await response.json();

    this.getAverages(currentYearData.year)
    
    this.props.addCurrentYearData(currentYearData.year);
  }

  handleSelectCurrentYear = () => {
    if(this.props.currentYearData.length) {
      this.getAverages(this.props.currentYearData);
    } else {
      this.getCurrentYear();
    }
  }

  getAverages = (data) => {
    const averagesTotal = {
      Jan: this.getMonthAverage(data.filter(el => el.mon === 1)),
      Feb: this.getMonthAverage(data.filter(el => el.mon === 2)),
      Mar: this.getMonthAverage(data.filter(el => el.mon === 3)),
      Apr: this.getMonthAverage(data.filter(el => el.mon === 4)),
      May: this.getMonthAverage(data.filter(el => el.mon === 5)),
      Jun: this.getMonthAverage(data.filter(el => el.mon === 6)),
      Jul: this.getMonthAverage(data.filter(el => el.mon === 7)),
      Aug: this.getMonthAverage(data.filter(el => el.mon === 8)),
      Sep: this.getMonthAverage(data.filter(el => el.mon === 9)),
      Oct: this.getMonthAverage(data.filter(el => el.mon === 10)),
      Nov: this.getMonthAverage(data.filter(el => el.mon === 11)),
      Dec: this.getMonthAverage(data.filter(el => el.mon === 12)),
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
  
    if (averages.tmax !== 0) {
      averages.tmax = Math.round((averages.tmax / days) * 10) / 10 + "°f";
      averages.tmin = Math.round((averages.tmin / days) * 10) / 10 + "°f";
      averages.snow = Math.round((averages.snow / days) * 10) / 10 + "in";
    } else {
      averages.tmax = "No Record";
      averages.tmin = "No Record";
      averages.snow = "No Record";
    }

    return averages;
  }

  render() {
    let year;
    let weatherCards;

    if (this.props.currentYearData.length) {
      year = this.props.currentYearData[0].year;
      let currentSelection = this.state.averages;

      weatherCards = Object.keys(currentSelection).map((monthName, index) => {
        const monthData = currentSelection[monthName];
        return (
          <div className="weather-card" key={index}>
            <h2>{monthName}</h2>
            <p className="hi-text">Hi: <span>{monthData.tmax}</span></p>
            <p className="low-text">Low: <span>{monthData.tmin}</span></p>
            <p className="snow-text">Snow: {monthData.snow}</p>
          </div>
        );
      });
    }
    return (
      <div className="GeneralDisplay">
        <div className="btn-container">
          <button className="btn-current" onClick={()=> this.handleSelectCurrentYear()}>This Year</button>
          <button className="btn-previous" onClick={()=> this.handleSelectPreviousYear()}>Previous Year</button>
          <button className="btn-pastfive">Past 5 Years</button>
        </div>
        <div className="months-display">
        </div>
        <p>Typical weather in {year}.</p>
        {weatherCards}
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


