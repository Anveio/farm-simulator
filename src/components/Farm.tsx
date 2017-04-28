import * as React from "react";
import FarmGrowthBar from "./FarmGrowthBar"

import FarmInfo from "../classes/farmInfo";

// import Farmer from "../classes/farmer";

class MouseData { 
  constructor(readonly hovering: boolean, readonly  mouseDown: boolean) {} 
}

interface FarmProps { farmID: string; onFarmGrowthBarFinish: any; onSelection: any; }
export default class Farm extends React.Component<FarmProps, MouseData> {
  constructor(props: any){
    super(props)
    this.state = {
      hovering: false,
      mouseDown: false
    }
  }

  farmInfo: FarmInfo;

  componentWillMount() {
    this.setFarmInfo();
  }

  setFarmInfo = () => {
    this.farmInfo = new FarmInfo(this.props.farmID)
  }

  sendGrowthFinishUpstream = (): void => {
    this.props.onFarmGrowthBarFinish();
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
        onMouseUp={this.handleMouseUp}>
        <FarmGrowthBar 
          key={this.props.farmID}
          gpID={this.props.farmID}
          growthRate={this.calculateFarmGrowthRate(this.state)}
          onGrowthFinish={this.sendGrowthFinishUpstream}
          onMouseDown={this.sendFarmSelectionUpstream} />
      </div>
    )
  }
}
