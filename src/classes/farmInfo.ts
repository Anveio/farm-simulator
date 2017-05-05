import Farmer from "./farmer";
import NameRepo from "./nameRepo";
import Upgrade from "./upgrade";
import Level from "./level";

const repo = new NameRepo;

export default class FarmInfo {
  constructor(readonly farmID: string) {

  }

  public getTotalRevenue = () => {
    // Performs the calculation in #calculateTotalRevenue() every time this is called
    // Store this value somewhere, but how to make sure it's always up to date?
    return this.calculateTotalRevenue();
  }

  private generateFarmer = () => {
    return new Farmer();
  }

  private generateRandomFarmName = () => {
    return repo.newFarmName();
  }

  private generateRandomBaseRevenue = () => {
    return parseFloat( ((Math.random() + 1) * 10).toFixed(2) );
  }

  private calculateTotalRevenue = () => {
    const currentLevelMulti = Math.pow(1.1, this.farmLevel.currentLevel);
    return this.baseRevenue * currentLevelMulti;
  }
  
  readonly farmer: Farmer = this.generateFarmer();
  readonly farmName: string = this.generateRandomFarmName();
  readonly farmLevel: Level = new Level(0);
  readonly baseRevenue: number = this.generateRandomBaseRevenue();
  readonly upgrades: Upgrade[];
}