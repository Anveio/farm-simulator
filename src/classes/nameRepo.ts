const maleFirstNamesArray: string[] = ["Arnold", "Chad", "Rueben", "Chi", "Roscoe", "Edmundo", "Forrest", "Lucius", "Andrea", "Kirk", "Carter", "Gregory", "Benito", "Oswaldo", "Hosea", "Clinton", "Tyron", "Tim", "Bennie", "Seymour", "Tod", "Garland", "Edison", "Cesar", "Malcolm", "Trevor", "Houston", "Clark", "Carmine", "Bart", "Randy", "Winston", "Hollis", "Todd", "Earnest", "Jordon", "Douglass", "Romeo", "Duncan", "Kim", "Wallace", "Lynn", "Tyson", "Tracy", "Yong", "Kendrick", "Pat", "Allan", "Corey", "Joshua", "Jayvon", "Dawson", "Pedro", "Davion", "Will", "Davion", "Rigoberto", "Bruno", "Thomas", "Hugh", "Tobias", "Immanuel", "Sidney", "Kenneth", "Frank", "Spencer", "Marcus", "Melvin", "Dennis", "Kash", "Garrett", "Jeremy", "Nathanial", "Atticus", "Izaiah", "Keenan", "Logan", "Kieran", "Jason", "Roy", "Guillermo", "Vicente", "Markus", "Ahmed", "Kayden", "Jamar", "Triston", "Howard", "Jefferson", "Axel", "Kellen", "Tomas", "Cordell", "Gavyn"]

const lastNamesArray: string[] = ["Shultz", "Cuevas", "Rhodes", "Mckenzie", "Taylor", "Glenn", "Reilly", "Morris", "Herman", "Beltran", "Swanson", "Roth", "Stone", "Benton", "Drake", "Michael", "Romero", "Yu", "Walls", "Calderon", "Shaffer", "Moreno", "Ibarra", "Nichols", "Solis", "Kline", "Choi", "Trevino", "Gonzalez", "Contreras", "Cervantes", "Haynes", "Kent", "Patel", "Dickson", "Manning", "Stokes", "Hickman", "Carter", "Baldwin", "Raymond", "Gay", "Cabrera", "Deleon", "Robertson", "Wang", "Acosta", "Roberson", "Vega", "Crosby", "Hall", "Coleman", "Luna", "Greer", "Chang", "Moon", "Myers", "Wilkins", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ]

const farmerQuotesArray: string[] = [
  "I am a Farm God",
  "Please just don't bother me.",
]

const farmNamesArray: string[] = [
  "Tequiero Ranchero", "The Frozen Ranch", "Oakey Dokey Nursery", "Sunset Estate", "Windy Willows", "Breezy Hills Acres", "Wild Horse Farmstead", "Rolling Moss Pastures", "Red River Acres", "Moonlight Pastures", "rolling Moss Ranch", "Rock Bottom Nursery", "Swan Lake Gardens","Day Break Estate","Mossy Rock Fields", "Morning Star Fields", "Rainbow Hill Estate", "Burning Sands Meadow", "Blazing Pitchfork Acres", "Chariot Range", "Lucky Star Grange","Ravenwood Ranch"
]



export default class NameRepo {
  private maleFirstNames: string[] = maleFirstNamesArray
  private farmerQuotes: string[] = farmerQuotesArray;
  private farmNames: string[] = farmNamesArray;
  private lastNames: string[] = lastNamesArray;

  public newFarmerName = () => {
    return ( 
      this.maleFirstNames[Math.floor(Math.random() * this.maleFirstNames.length)]
      + " " +
      this.lastNames[Math.floor(Math.random() * this.lastNames.length)]
    )
  }

  public newFarmQuote = () => {
    return this.farmerQuotes[Math.floor(Math.random() * this.farmerQuotes.length)]
  }

  public newFarmName = () => {
    return this.farmNames[Math.floor(Math.random() * this.farmNames.length)]
  }
}