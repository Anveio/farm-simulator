import * as React from "react";

interface FarmGrowthBarProps { 
  gpID: string; 
  growthRate: number;
  growthMultiplier: number;
  onGrowthFinish(): void
  onMouseDown(): void;
}

export default class FarmGrowthBar extends React.Component<FarmGrowthBarProps, { progress: number }> {
  constructor(props: FarmGrowthBarProps){
    super(props)
    this.state = {
      progress: 0,
    }
  }

  growthRate = this.props.growthRate;
  
  tickRate: number = 16.67;

  ticker: any;
  componentDidMount():void {
    this.ticker = setInterval(() => { this.tick(); }
    , this.tickRate)
  }

  componentWillReceiveProps(nextProps: FarmGrowthBarProps) {
    process.nextTick(() => {
      clearInterval(this.ticker)
      this.growthRate = nextProps.growthRate;
      this.ticker = setInterval(() =>
        this.tick(nextProps.growthMultiplier), 
        this.tickRate
      )
    })
  }

  tick = (growthMultiplier:number = this.props.growthMultiplier):void => {
    if (this.state.progress >= 100) {
      this.props.onGrowthFinish();

      this.setState({
        progress: 0,
      })
    }

    this.setState(prevState => {
      return { 
        progress: prevState.progress + (0.1 * growthMultiplier * this.growthRate),
      }
    })
  }

  // Clicking on the progress bar doesn't trigger Farm selection without this.
  // CSS Handles this through `pointer-events: none` but just in case that isn't there
  handleMouseDown = ():void => {
    this.props.onMouseDown();
  }

  calculateSizeOfFarmProgressBar = () => {
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
        className="farm-growth-progress" 
        style={this.calculateSizeOfFarmProgressBar()}
        onMouseDown={this.handleMouseDown} > 
      </span>
    )
  }
}