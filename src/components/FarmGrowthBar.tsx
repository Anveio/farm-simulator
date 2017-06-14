import * as React from 'react';

interface Props { 
  growthBarID: string; 
  growthRate: number;
  efficiency: number;
  onGrowthFinish(): void;
  onMouseDown(): void;
}

interface State {
  progress: number;
}

export default class  extends React.Component<Props, State> {
  private growthRate = this.props.growthRate;
  private tickRate: number = 16.67; // Aiming for 60fps.
  private ticker: number;

  constructor(props: Props) {
    super(props);
    this.state = {
      progress: 0,
    };
  }

  componentDidMount(): void {
    this.ticker = window.setInterval(() => { this.tick(); }, this.tickRate);
  }

  componentWillReceiveProps(nextProps: Props) {
    clearInterval(this.ticker);
    this.growthRate = nextProps.growthRate;
    this.ticker = window.setInterval(() =>
      this.tick(nextProps.efficiency), 
                                     this.tickRate
    );
  }

  readonly tick = (efficiency: number = this.props.efficiency): void => {
    if (this.state.progress >= 100) {
      this.props.onGrowthFinish();

      this.setState(prevState => {
        return { 
          progress: prevState.progress - 100 
        };
      });
    }

    this.setState(prevState => {
      return { 
        progress: prevState.progress + (0.1 * efficiency * this.growthRate)
      };
    });
  }

  // Clicking on the progress bar doesn't trigger Farm selection without this.
  // CSS Handles this through `pointer-events: none` but just in case that isn't there
  handleMouseDown = (): void => {
    this.props.onMouseDown();
  }

  calculateWidth = () => {
    const width = this.state.progress >= 100 
      ? '100%'
      : `${this.state.progress}%`;
      
    return {
      width: width,
      height: '100%' 
    }; 
  }

  render() {
    return (
      <span 
        id={'gp-' + this.props.growthBarID} 
        className="farm-growth-bar" 
        style={this.calculateWidth()}
        onMouseDown={this.handleMouseDown} 
      /> 
    );
  }
}