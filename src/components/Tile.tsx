import * as React from "react";
import TileGrowthBar from "./TileGrowthBar"

class MouseData { 
  constructor(readonly hovering: boolean, readonly  mouseDown: boolean) {} 
}

interface TileProps { tileID: string; onTileGrowthBarFinish: any; onSelection: any; }
export default class Tile extends React.Component<TileProps, MouseData> {
  constructor(props: any){
    super(props)
    this.state = {
      hovering: false,
      mouseDown: false
    }
  }

  sendGrowthFinishUpstream = (): void => {
    this.props.onTileGrowthBarFinish();
  }

  sendTileSelectionUpstream = (): void => {
    // Fill this method will all the information you want to send about this tile upstream
    // This information will bubble up to <Game /> and then down to <Menu />
    this.props.onSelection(this.props.tileID);
  }

  calculateTileGrowthBarRate = (mouseData: MouseData): number => {
    let newTileGrowthBarRate: number = 1;

    if (!mouseData.hovering){
      newTileGrowthBarRate = 1;
    } else if (mouseData.mouseDown){
      newTileGrowthBarRate = 4;
    } else if (mouseData.hovering) {
      newTileGrowthBarRate = 2;
    }
    return newTileGrowthBarRate;
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
    this.sendTileSelectionUpstream();

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
        className="tile" 
        id={"tile-" + this.props.tileID}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}>
        <TileGrowthBar 
          gpID={this.props.tileID}
          growthRate={this.calculateTileGrowthBarRate(this.state)}
          onGrowthFinish={this.sendGrowthFinishUpstream}
          onMouseDown={this.sendTileSelectionUpstream} />
      </div>
    )
  }
}

