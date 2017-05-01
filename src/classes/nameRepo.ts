Array.prototype.sample = function() {
  return this[Math.floor(Math.random() * this.length)]
}

export default class NameRepo {
  private maleFirstNames: string[] = maleFirstNamesArray
  private farmerQuotes: string[] = farmerQuotesArray;
  private farmNames: string[] = farmNamesArray;
  private lastNames: string[] = lastNamesArray;

  public newFarmerName = () => {
    return ( 
      this.maleFirstNames.sample()
      + " " +
      this.lastNames.sample()
    )
  }

  public newFarmQuote = () => {
    return this.farmerQuotes.sample();
  }

  public newFarmName = () => {
    return this.farmNames.sample();
  }
}


const maleFirstNamesArray: string[] = ["Arnold", "Chad", "Rueben", "Chi", "Roscoe", "Edmundo", "Forrest", "Lucius", "Andrea", "Kirk", "Carter", "Gregory", "Benito", "Oswaldo", "Hosea", "Clinton", "Tyron", "Tim", "Bennie", "Seymour", "Tod", "Garland", "Edison", "Cesar", "Malcolm", "Trevor", "Houston", "Clark", "Carmine", "Bart", "Randy", "Winston", "Hollis", "Todd", "Earnest", "Jordon", "Douglass", "Romeo", "Duncan", "Kim", "Wallace", "Lynn", "Tyson", "Tracy", "Yong", "Kendrick", "Pat", "Allan", "Corey", "Joshua", "Jayvon", "Dawson", "Pedro", "Davion", "Will", "Davion", "Rigoberto", "Bruno", "Thomas", "Hugh", "Tobias", "Immanuel", "Sidney", "Kenneth", "Frank", "Spencer", "Marcus", "Melvin", "Dennis", "Kash", "Garrett", "Jeremy", "Nathanial", "Atticus", "Izaiah", "Keenan", "Logan", "Kieran", "Jason", "Roy", "Guillermo", "Vicente", "Markus", "Ahmed", "Kayden", "Jamar", "Triston", "Howard", "Jefferson", "Axel", "Kellen", "Tomas", "Cordell", "Gavyn"]

const lastNamesArray: string[] = ["Shultz", "Cuevas", "Rhodes", "Mckenzie", "Taylor", "Glenn", "Reilly", "Morris", "Herman", "Beltran", "Swanson", "Roth", "Stone", "Benton", "Drake", "Michael", "Romero", "Yu", "Walls", "Calderon", "Shaffer", "Moreno", "Ibarra", "Nichols", "Solis", "Kline", "Choi", "Trevino", "Gonzalez", "Contreras", "Cervantes", "Haynes", "Kent", "Patel", "Dickson", "Manning", "Stokes", "Hickman", "Carter", "Baldwin", "Raymond", "Gay", "Cabrera", "Deleon", "Robertson", "Wang", "Acosta", "Roberson", "Vega", "Crosby", "Hall", "Coleman", "Luna", "Greer", "Chang", "Moon", "Myers", "Wilkins"]



const farmNamesArray: string[] = [
  "Tequiero Ranchero", "The Frozen Ranch", "Oakey Dokey Nursery", "Sunset Estate", "Windy Willows", "Breezy Hills Acres", "Wild Horse Farmstead", "Rolling Moss Pastures", "Red River Acres", "Moonlight Pastures", "Rolling Moss Ranch", "Rock Bottom Nursery", "Swan Lake Gardens","Day Break Estate","Mossy Rock Fields", "Morning Star Fields", "Rainbow Hill Estate", "Burning Sands Meadow", "Blazing Pitchfork Acres", "Chariot Range", "Lucky Star Grange","Ravenwood Ranch"
]

const farmerQuotesArray: string[] = [
  "I'm beginning to feel like a Farm God.",
  "Please just don't bother me.",
  "I'm not like those other farmers.",
  "Work, work",
  "Something need doing?",
  "I would work faster but...",
  "It is only the farmer who faithfully plants seeds in the Spring, who reaps a harvest in the Autumn.",
  "A good farmer is nothing more nor less than a handy man with a sense of humus",
  "A farmer has to be an optimist or he wouldn't still be a farmer",
  "Eat. Sleep. Farm. Repeat.",
  "What farm animal keeps the best time? A watch dog!",
  "If a cow laughed really hard... would milk come out of her nose?",
  "What's the best part of farming? Getting down and dirty with my hoes.",
  "What crop grows under your nose? Tulips!"

]