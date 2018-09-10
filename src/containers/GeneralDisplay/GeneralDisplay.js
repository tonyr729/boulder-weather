import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addCurrentYearData, addPreviousYearData, addLastFiveYearsData, addAllData } from '../../actions';
import './GeneralDisplay.css';

class GeneralDisplay extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      selectedYear: null,
      averages: []
    }
  }

  componentDidMount(){
    this.getCurrentYear();
    this.getPreviousYear();
    this.getLastFiveYears();
    this.getAllData();
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
      const yearData = this.props.currentYearData;
      this.setState({
        selectedYear: yearData[0].year,
        averages: this.getAverages(yearData)
      })
    } else {
      this.getCurrentYear();
    }
  }

  getPreviousYear = async () => {
    const previousYear = ((new Date()).getFullYear()) - 1;
    const url = `http://localhost:3001/api/v1/year/${previousYear}`;
    const response = await fetch(url);
    const previousYearData = await response.json();
    
    this.props.addPreviousYearData(previousYearData.year);
  }

  handleSelectPreviousYear = () => {
    if(this.props.previousYearData.length) {
      const yearData = this.props.previousYearData;
      
      this.setState({
        selectedYear: yearData[0].year,
        averages: this.getAverages(yearData)
      })
    } else {
      this.getPreviousYear();
    }
  }

  getLastFiveYears = async () => {
    const url = `http://localhost:3001/api/v1/last5`;
    const response = await fetch(url);
    const lastFiveYearsData = await response.json();
    
    this.props.addLastFiveYearsData(lastFiveYearsData.years);
  }

  handleSelectLastFiveYears = () => {
    const currentYear = ((new Date()).getFullYear())
    const fiveYearsAgo = currentYear - 5;

    if (this.props.lastFiveYearsData.length) {
      const yearData = this.props.lastFiveYearsData;
      
      this.setState({
        selectedYear: `${fiveYearsAgo} to ${currentYear}`,
        averages: this.getAverages(yearData)
      })
    } else {
      this.getLastFiveYears();
    }
  }

  getAllData = async () => {
    const url = 'http://localhost:3001/api/v1/all';
    const response = await fetch(url);
    const allData = await response.json();
    
    this.props.addAllData(allData.weather);
  }

  getAverages = (data) => {
    const months = ["Jan", "Feb", "Mar", "April", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const averagesTotal = months.reduce((averages, month, index) =>{
      if (!averages[month]){
        averages[month] = this.getMonthAverage(data.filter(el => el.mon === (index + 1)));
      }
      return averages;
    }, {});
    
    if (!this.state.isLoaded) {
      this.setState({
        isLoaded: true,
        selectedYear: data[0].year,
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
      averages.snow += day.snowcover;

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
      year = this.state.selectedYear;
      let selectedAverages = this.state.averages;

      weatherCards = Object.keys(selectedAverages).map((monthName, index) => {
        const monthData = selectedAverages[monthName];
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
      <div className="general-display">
        <div className="btn-container">
          <button className="btn-current" onClick={()=> this.handleSelectCurrentYear()}>This Year</button>
          <button className="btn-previous" onClick={()=> this.handleSelectPreviousYear()}>Previous Year</button>
          <button className="btn-pastfive" onClick={()=> this.handleSelectLastFiveYears()}>Past 5 Years</button>
        </div>
        <div className="months-display">
        </div>
        <p>Averaged weather from {year}.</p>
        <div className="card-container">
          {weatherCards}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  currentYearData: state.currentYearData,
  previousYearData: state.previousYearData,
  lastFiveYearsData: state.lastFiveYearsData,
  allData: state.allData
});

export const mapDispatchToProps = (dispatch) => ({
  addCurrentYearData: (currentYearData) => dispatch(addCurrentYearData(currentYearData)),
  addPreviousYearData: (previousYearData) => dispatch(addPreviousYearData(previousYearData)),
  addLastFiveYearsData: (lastFiveYearsData) => dispatch(addLastFiveYearsData(lastFiveYearsData)),
  addAllData: (allData) => dispatch(addAllData(allData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GeneralDisplay));


