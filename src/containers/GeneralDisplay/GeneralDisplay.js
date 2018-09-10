import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addCurrentYearData } from '../../actions';
import './GeneralDisplay.css';

class GeneralDisplay extends Component {

  componentDidMount(){
    this.getCurrentYear()
  }

  getCurrentYear = async () => {
    const currentYear = (new Date()).getFullYear();
    const url = `http://localhost:3001/api/v1/year/${currentYear}`;
    const response = await fetch(url);
    const currentYearData = await response.json();
    
    this.props.addCurrentYearData(currentYearData.year);
  }

  render() {
    let year;
    if (this.props.currentYearData.length) {
      year = this.props.currentYearData[0].year
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


