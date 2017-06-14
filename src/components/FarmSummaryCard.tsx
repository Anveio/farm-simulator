import * as React from 'react';
import FarmInfo from '../classes/farmInfo';

const FarmSummaryDisplay = (props: {selectedFarmInfo: FarmInfo}) => {

  const farmInfo: FarmInfo = props.selectedFarmInfo;
  const farmLevel = farmInfo.farmLevel;

  return (
    <div className="farm-info">
      <div className="farm-name-container">
        <h3>"{farmInfo.farmName}"</h3>
      </div>
      <div className="farm-stats-container">
        <h2> 
          Level: {farmLevel.currentLevel}
          <span className="level-exp-info">
            ({farmLevel.expCurrent.toFixed(2)} / {farmLevel.expReq.toFixed(2)})
          </span>
        </h2>

        <h2 className="farm-efficiency">
          Speed: {farmInfo.farmer.efficiency}
        </h2>
        <h2 className="farm-revenue">
          Profit: ${farmInfo.getTotalRevenue().toFixed(2)}
        </h2>
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

export const FarmSummaryCard = (props: { selectedFarmInfo: FarmInfo | null }) => {
  if (props.selectedFarmInfo) {
    return (
      <FarmSummaryDisplay selectedFarmInfo={props.selectedFarmInfo} />
    );
  } else {
    return ( <div className="farm-info"><h3>No Tile Selected</h3></div> );
  }
};
