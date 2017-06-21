import * as React from 'react';
import FarmInfo from '../../classes/farmInfo';

import './styles/FarmSummaryCard.css';

interface Props { farmSelection: FarmInfo | null; }
export const FarmSummaryCard = ( { farmSelection }: Props) => {
  const noFarmSelectedMarkup = () => {
    return ( <div className="farm-summary"><h3>No Farm Selected</h3></div> );
  };

  const farmSelectedMarkup = (farmInfo: FarmInfo) => {
    const farmLevel = farmInfo.farmLevel;
    return (
      <div className="farm-summary">
      <div className="farm-name-container">
        <h2>{farmInfo.farmName}</h2>
      </div>
      <div className="farm-stats-container">
        <h3 className="left-header"> 
          Level: {farmLevel.currentLevel}
          <span className="level-exp-info">
            ({farmLevel.expCurrent.toFixed(2)} / {farmLevel.expReq.toFixed(2)})
          </span>
        </h3>

        <h3 className="left-header farm-efficiency">
          Speed: {farmInfo.farmer.efficiency}
        </h3>
        <h3 className="left-header farm-revenue">
          Profit: ${farmInfo.getTotalRevenue().toFixed(2)}
        </h3>
      </div>
      <div className="farm-flavor-text-container">
        <p className="farmer-quote">
          "{farmInfo.farmer.quote}" 
        </p> 
        <p className="farmer-quote-name">  
          {' - ' + farmInfo.farmer.name}, Farm Owner    
        </p>
      </div>
    </div>
    );
  };

  return (
    farmSelection
    ? farmSelectedMarkup(farmSelection)
    : noFarmSelectedMarkup()
  );
};