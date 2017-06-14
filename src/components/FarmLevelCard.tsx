import * as React from 'react';
import FarmInfo from '../classes/farmInfo';
import Level from '../classes/level';

const FarmLevelDisplay = (props: { selectedFarmInfo: FarmInfo }) => {
  const farmLevel: Level = props.selectedFarmInfo.farmLevel;

  return (
    <div className="farm-info">
      <div className="farm-name-container">
        <h3>"{props.selectedFarmInfo.farmName}"</h3>
      </div>
      <div className="farm-stats-container">
        <h2 className="farm-efficiency">
          Level: {farmLevel.currentLevel}
        </h2>
        <h2 className="farm-revenue">
          Exp: {farmLevel.expCurrent.toFixed(2)} / {farmLevel.expReq.toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export const FarmLevelCard = (props: { selectedFarmInfo: FarmInfo | null }) => {
  if (props.selectedFarmInfo) {
    return (
      <FarmLevelDisplay selectedFarmInfo={props.selectedFarmInfo} />
    );
  } else {
    return ( <div className="farm-info"><h3>No Tile Selected</h3></div> );
  }
};
