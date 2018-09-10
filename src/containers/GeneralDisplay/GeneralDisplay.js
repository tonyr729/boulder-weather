import React, { Component } from 'react';

import './GeneralDisplay.css';

class GeneralDisplay extends Component {

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


