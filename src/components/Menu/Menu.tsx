import * as React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import FarmInfo from '../../classes/farmInfo';
import { MoneyCounter } from './MoneyCounter';
import { FarmSummaryCard } from './FarmSummaryCard';
import { FarmLevelCard } from './FarmLevelCard';

import './styles/Menu.css';
import 'react-tabs/style/react-tabs.css';

interface MenuProps { money: number; selectedFarmInfo: FarmInfo | null; }
interface MenuState { currentSelection: FarmInfo | null; }
export default class Menu extends React.Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);
  }

  render() {
    return (
      <div className="menu-column">
        <div className="menu">
          <MoneyCounter money={this.props.money} />
          <Tabs >
            <TabList>
              <Tab>Summary</Tab>
              <Tab>Level</Tab>
            </TabList>
            
            <TabPanel>
              <FarmSummaryCard farmSelection={this.props.selectedFarmInfo} />
            </TabPanel>
            
            <TabPanel>
              <FarmLevelCard selectedFarmInfo={this.props.selectedFarmInfo} />
            </TabPanel>
          </Tabs>  
        </div>
      </div>
    );
  }
}
