import * as React from "react";
import FarmInfo from "../classes/farmInfo";

export const FarmMenuCard = (props: {selectedFarmInfo: FarmInfo}) => {
  return (
    <div className="farm-info">
      <div className="farm-name-container">
        <h3>"{props.selectedFarmInfo.farmName}"</h3>
      </div>
      <div className="farm-stats-container">
        <h2 className="farm-efficiency">
          Speed: {props.selectedFarmInfo.farmer.efficiency}
        </h2>
        <h2 className="farm-revenue">
          Profit: ${props.selectedFarmInfo.getTotalRevenue().toFixed(2)}
        </h2>
      </div>
      <div className="farm-flavor-text-container">
        <p className="farmer-quote">
          "{props.selectedFarmInfo.farmer.quote}" 
        </p> 
        <p className="farmer-quote-name">  
          {" - " + props.selectedFarmInfo.farmer.name}, Farm Owner    
        </p>
      </div>
    </div>
  )
}