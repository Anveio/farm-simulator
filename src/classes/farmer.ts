import NameRepo from "./nameRepo";

const repo = new NameRepo;

export default class Farmer {
  private generateRandomName = () => {
    return repo.newName()
  }

  private generateRandomQuote = () => {
    return repo.newQuote();
  }

  private generateRandomStatEfficiency = () => {
    return parseFloat((Math.random() + 1).toFixed(2));
  }

  readonly name: string = this.generateRandomName();
  readonly quote: string = this.generateRandomQuote();
  public efficiency: number = this.generateRandomStatEfficiency();
}