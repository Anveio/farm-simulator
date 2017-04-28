import NameRepo from "./nameRepo";

const repo = new NameRepo;

export default class Farmer {
  private generateRandomName = () => {
    return repo.newName()
  }

  private generateRandomQuote = () => {
    return repo.newQuote();
  }

  readonly name: string = this.generateRandomName();
  readonly quote: string = this.generateRandomQuote();
}