import NameRepo from "./nameRepo";

const repo = new NameRepo;

export default class Farmer {
  private generateRandomName = () => {
    return repo.newFarmerName()
  }

  private generateRandomQuote = () => {
    return repo.newFarmQuote();
  }

  private generateRandomStatEfficiency = () => {
    return parseFloat((Math.random() + 1).toFixed(2));
  }

  readonly name: string = this.generateRandomName();
  readonly quote: string = this.generateRandomQuote();
  readonly efficiency: number = this.generateRandomStatEfficiency();
}