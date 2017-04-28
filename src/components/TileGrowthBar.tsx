import * as React from "react";

interface TileGrowthBarProps { 
  gpID: string; 
  growthRate: number; 
  onGrowthFinish: any
  onMouseDown: any;
}

export default class TileGrowthBar extends React.Component<TileGrowthBarProps, { progress: number }> {
  constructor(props: any){
    super(props)
    this.state = {
      progress: 0,
    }
  }

  tickRate: number = 50;

  ticker: any;
  componentDidMount():void {
    this.ticker = setInterval(() => { this.tick(); }
    , this.tickRate)
  }

  componentWillReceiveProps(nextProps: TileGrowthBarProps) {
    process.nextTick(() => {
      clearInterval(this.ticker)
      this.ticker = setInterval(() =>
        this.tick(nextProps.growthRate), 
        this.tickRate
      )
    })
  }

  tick(growthMultiplier:number = 1):void {
    if (this.state.progress >= 100) {
      this.props.onGrowthFinish();

      this.setState({
        progress: 0,
      })
    }

    this.setState(prevState => {
      return { 
        progress: Math.min(Math.max(prevState.progress + (1 * growthMultiplier), 1), 100),
      }
    })
  }

  // Clicking on the progress bar doesn't trigger tile selection without this.
  // Wierd idiosyncracy, maybe can be avoided by structuring the HTML differently?
  handleMouseDown = (): void => {
    this.props.onMouseDown();
  }

  calculateSizeOfTileProgressBar = () => {
    let width
    
    if(this.state.progress >= 100) {
      width = '100%';
    } else {
      width = `${this.state.progress}%`
    }

    return {
      width: width,
      height: '100%' 
    } 
  }

  render() {
    return (
      <span 
        id={'gp-' + this.props.gpID} 
        className="tile-growth-progress" 
        style={this.calculateSizeOfTileProgressBar()}
        onMouseDown={this.handleMouseDown} > 
      </span>
    )
  }
}