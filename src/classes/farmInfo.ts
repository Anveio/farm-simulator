import repo from './nameRepo';
import Farmer from './farmer';
import Level from './level';
import Upgrade from './upgrade';

export default class FarmInfo {
  public readonly farmer: Farmer;
  public readonly farmName: string;
  public readonly farmLevel: Level;
  public readonly baseRevenue: number;
  public readonly upgrades: Upgrade[];

  constructor(readonly farmID: string) {
    this.farmer = this.generateFarmer();
    this.farmName = this.generateRandomFarmName();
    this.farmLevel = new Level(0);
    this.baseRevenue = this.generateRandomBaseRevenue();
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
}