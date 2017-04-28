const maleFirstNamesArray: string[] = ["Arnold", "Chad", "Rueben", "Chi", "Roscoe", "Edmundo", "Forrest", "Lucius", "Andrea", "Kirk", "Carter", "Gregory", "Benito", "Oswaldo", "Hosea", "Clinton", "Tyron", "Tim", "Bennie", "Seymour", "Tod", "Garland", "Edison", "Cesar", "Malcolm", "Trevor", "Houston", "Clark", "Carmine", "Bart", "Randy", "Winston", "Hollis", "Todd", "Earnest", "Jordon", "Douglass", "Romeo", "Duncan", "Kim", "Wallace", "Lynn", "Tyson", "Tracy", "Yong", "Kendrick", "Pat", "Allan", "Corey", "Joshua"]

const farmerQuotesArray: string[] = [
  "I am a Farm God",
  "Please just don't bother me.",
]



export default class NameRepo {
  private maleFirstNames: string[] = maleFirstNamesArray
  private farmerQuotes: string[] = farmerQuotesArray;

  public newName = () => {
    return this.maleFirstNames[Math.floor(Math.random() * this.maleFirstNames.length)]
  }

  public newQuote = () => {
    return this.farmerQuotes[Math.floor(Math.random() * this.farmerQuotes.length)]
  }
}