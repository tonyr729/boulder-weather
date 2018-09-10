import React, { Component } from 'react';

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

    this.props.addCurrentYearData(currentYearData);
  }

  render() {
    return (
      <div className="GeneralDisplay">
        <div className="timeframe-container">
          <button className="btn-current">This Year</button>
          <button className="btn-previous">Previous Year</button>
          <button className="btn-pastfive">Past 5 Years</button>
        </div>
        <div className="months-display">
        </div>
        
      </div>
    );
  }
}

export default GeneralDisplay;


