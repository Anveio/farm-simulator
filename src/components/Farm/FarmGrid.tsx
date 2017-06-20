import * as React from 'react';
import FarmInfo from '../../classes/farmInfo';
import Farm from './Farm';

import './styles/FarmGrid.css';

interface Props { 
  onFarmGrowthFinish(revenue: number): void; 
  onFarmPurchase(farmCost: number): boolean;
  onFarmPurchaseVerification(farmCost: number): void;
  onFarmSelection(farmInfo: FarmInfo): void; 
}

interface State {
  farms: number;
}

export default class FarmGrid extends React.PureComponent<Props, State > {
  constructor(props: Props) {
    super(props);
    this.state = {
      farms: 9
    };

    // ES2017 Class method syntax means you dont have to bind in the constructor
    // See https://daveceddia.com/react-best-alternative-bind-render/
  }

  readonly handleFarmGrowthBarFinish = (revenue: number): void => {
    this.props.onFarmGrowthFinish(revenue);
  }

  readonly handleFarmSelection = (farmInfo: FarmInfo): void => {
    this.props.onFarmSelection(farmInfo);
  }

  readonly buildFarmGrid = (farmsToCreate: number): JSX.Element[] => {
    let createdFarms: JSX.Element[] = [];

    for (let i = 0; i < farmsToCreate; i++) {
      createdFarms.push(
        <li key={i.toString()} className="farm-li">
          <Farm 
            key={i.toString()}
            farmID={(i + 1).toString()}
            onFarmGrowthBarFinish={this.handleFarmGrowthBarFinish}
            onSelection={this.handleFarmSelection} 
          />
        </li>
      );
    }
    return createdFarms;
  }

  readonly calculateFarmCost = (): number => {
    const baseCost: number = 350;
    const coEf: number = 1.65;

    // FORMULA: cost = 350 * (1.65^currentFarmCount)
    return (baseCost * (Math.pow(coEf, this.state.farms)));
  }

  readonly addFarmToFarmGrid = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault(); // Maybe not necessary
    const farmCost = this.calculateFarmCost();

    if (this.props.onFarmPurchase(farmCost) === true && this.state.farms < 25) {
      this.props.onFarmPurchaseVerification(farmCost);
      this.setState(prevState => {
        return { farms: prevState.farms += 1 };
      });
    }
  }

  public render() {
    const formattedFarmCost = () => {
      const cost = this.calculateFarmCost();
      const formatLargeNum = (largeNum: number): string => {
        let short = largeNum.toPrecision(3);
        return parseFloat(short).toExponential();
      };

      const formatSmallNum = (smallNum: number): string => {
        return parseFloat(smallNum.toPrecision(3)).toFixed(0);
      };

      return (cost > parseFloat('1e6')) ? formatLargeNum(cost) : formatSmallNum(cost);      
    };

    const farmLimitReached = () => {
      return this.state.farms >= 25;
    };

    return (
      <ul className="farm-ul">
        {this.buildFarmGrid(this.state.farms)}
        <li className="farm-li add-farm-li"> 
          <button 
            className="farm add-farm-btn"
            disabled={farmLimitReached()} 
            onClick={this.addFarmToFarmGrid} 
          >
          ${formattedFarmCost()}
          </button> 
        </li>
      </ul>
    );
  }
}