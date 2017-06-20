import * as React from 'react';
import FarmInfo from '../../classes/farmInfo';
import Level from '../../classes/level';

interface Props { farmSelection: FarmInfo | null; }
export const FarmLevelCard = ({ farmSelection }: Props ) => {
  
  const noFarmSelectedMarkup = () => {
    return ( <div className="farm-summary"><h3>No Farm Selected</h3></div> );
  };
  
  const farmSelectedMarkup = (farmInfo: FarmInfo) => {
    const farmLevel: Level = farmInfo.farmLevel;
    return (
      <div className="farm-summary">
        <div className="farm-name-container">
          <h3>"{farmInfo.farmName}"</h3>
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

  return (
    farmSelection
    ? farmSelectedMarkup(farmSelection)
    : noFarmSelectedMarkup()
  );
};

// export const FarmLevelCard = (props: { selectedFarmInfo: FarmInfo | null }) => {
//   if (props.selectedFarmInfo) {
//     return (
//       <FarmLevelDisplay selectedFarmInfo={props.selectedFarmInfo} />
//     );
//   } else {
//     return ( <div className="farm-info"><h3>No Tile Selected</h3></div> );
//   }
// };
