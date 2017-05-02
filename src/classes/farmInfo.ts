import Farmer from "./farmer";
import NameRepo from "./nameRepo";
import Upgrade from "./upgrade";

const repo = new NameRepo;

export default class FarmInfo {
  constructor(readonly farmID: string) {}

  public getTotalRevenue = () => {
    // Performs the calculation in #calculateTotalRevenue() every time this is called
    // Store this value somewhere, but how to make sure it's always up to date?
    return this.calculateTotalRevenue();
  }

  private generateRandomFarmer = () => {
    return new Farmer();
  }

  private generateRandomFarmName = () => {
    return repo.newFarmName();
  }

  private generateRandomBaseRevenue = () => {
    return parseFloat( ((Math.random() + 1) * 10).toFixed(2) );
  }

  private calculateTotalRevenue = () => {
    const levelMulti = Math.pow(1.1, this.level);
    return this.baseRevenue * levelMulti;
  }
  

  readonly farmer: Farmer = this.generateRandomFarmer();
  readonly farmName: string = this.generateRandomFarmName();
  readonly baseRevenue: number = this.generateRandomBaseRevenue();
  readonly level: number = 0;
  readonly upgrades: Upgrade[];
}