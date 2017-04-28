const maleFirstNamesArray: string[] = ["Arnold", "Chad", "Rueben", "Chi", "Roscoe", "Edmundo", "Forrest", "Lucius", "Andrea", "Kirk", "Carter", "Gregory", "Benito", "Oswaldo", "Hosea", "Clinton", "Tyron", "Tim", "Bennie", "Seymour", "Tod", "Garland", "Edison", "Cesar", "Malcolm", "Trevor", "Houston", "Clark", "Carmine", "Bart", "Randy", "Winston", "Hollis", "Todd", "Earnest", "Jordon", "Douglass", "Romeo", "Duncan", "Kim", "Wallace", "Lynn", "Tyson", "Tracy", "Yong", "Kendrick", "Pat", "Allan", "Corey", "Joshua"]

export default class NameRepo {
  private maleFirstNames: string[] = maleFirstNamesArray

  public newName = () => {
    return this.maleFirstNames[Math.floor(Math.random() * this.maleFirstNames.length)]
  }
}