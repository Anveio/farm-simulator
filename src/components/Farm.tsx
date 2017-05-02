import * as React from "react";
import FarmGrowthBar from "./FarmGrowthBar"

import FarmInfo from "../classes/farmInfo";

// import Farmer from "../classes/farmer";

class MouseData { 
  constructor(readonly hovering: boolean, readonly  mouseDown: boolean) {} 
}

interface FarmProps { 
  farmID: string; 
  onFarmGrowthBarFinish(revenue: number): void; 
  onSelection(farmInfo: FarmInfo): void; 
}

export default class Farm extends React.Component<FarmProps, MouseData> {
  constructor(props: FarmProps){
    super(props)
    this.state = {
      hovering: false,
      mouseDown: false
    }

    // const farmInfo: FarmInfo = this.newFarmInfo();
  }

  farmInfo: FarmInfo

  componentWillMount() {
    this.farmInfo = this.newFarmInfo();
  }

  newFarmInfo = (): FarmInfo => {
    return new FarmInfo(this.props.farmID)
  }

  sendGrowthFinishUpstream = (): void => {
    this.props.onFarmGrowthBarFinish(this.farmInfo.getTotalRevenue());
  }

  sendFarmSelectionUpstream = (): void => {
    // Fill this method will all the information you want to send about this Farm upstream
    // This information will bubble up to <Game /> and then down to <Menu />
    this.props.onSelection(this.farmInfo);
  }

  calculateFarmGrowthRate = (mouseData: MouseData): number => {
    let newFarmGrowthBarRate: number = 1;

    if (!mouseData.hovering){
      newFarmGrowthBarRate = 1;
    } else if (mouseData.mouseDown){
      newFarmGrowthBarRate = 4;
    } else if (mouseData.hovering) {
      newFarmGrowthBarRate = 2;
    }
    return newFarmGrowthBarRate;
  }

  handleMouseEnter = (): void => {
    this.setState({
      hovering: true
    })
  }

  handleMouseLeave = (): void => {
    this.setState({
      hovering: false
    })
  }

  // e: React.MouseEvent<HTMLDivElement>
  handleMouseDown = (): void => {    
    this.sendFarmSelectionUpstream();

    this.setState({
      mouseDown: true
    })
  }

  handleMouseUp = ():void => {
    this.setState({
      mouseDown: false
    })
  }

  render() {
    return (
      <div 
        className="farm"   
        id={"farm-" + this.props.farmID}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp} >
        <FarmGrowthBar 
          key={this.props.farmID}
          gpID={this.props.farmID}
          growthRate={this.calculateFarmGrowthRate(this.state)}
          efficiency={this.farmInfo.farmer.efficiency}
          onGrowthFinish={this.sendGrowthFinishUpstream}
          onMouseDown={this.sendFarmSelectionUpstream} />
      </div>
    )
  }
}

