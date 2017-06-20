Array.prototype.sample = function() {
  return this[Math.floor(Math.random() * this.length)];
};

class NameRepo {
  private readonly maleFirstNames: string[] = ['Arnold', 'Chad', 'Rueben', 
    'Chi', 'Roscoe', 'Edmundo', 'Forrest', 'Lucius', 'Andrea', 'Kirk', 'Carter', 
    'Gregory', 'Benito', 'Oswaldo', 'Hosea', 'Clinton', 'Tyron', 'Tim', 'Bennie', 
    'Seymour', 'Tod', 'Garland', 'Edison', 'Cesar', 'Malcolm', 'Trevor', 
    'Houston', 'Clark', 'Carmine', 'Bart', 'Randy', 'Winston', 'Hollis', 'Todd',
    'Earnest', 'Jordon', 'Douglass', 'Romeo', 'Duncan', 'Kim', 'Wallace', 'Lynn', 
    'Tyson', 'Tracy', 'Yong', 'Kendrick', 'Pat', 'Allan', 'Corey', 'Joshua', 
    'Jayvon', 'Dawson', 'Pedro', 'Davion', 'Will', 'Davion', 'Rigoberto', 
    'Bruno', 'Thomas', 'Hugh', 'Tobias', 'Immanuel', 'Sidney', 'Kenneth', 
    'Frank', 'Spencer', 'Marcus', 'Melvin', 'Dennis', 'Kash', 'Garrett', 'Jeremy', 
    'Nathanial', 'Atticus', 'Izaiah', 'Keenan', 'Logan', 'Kieran', 'Jason', 'Roy', 
    'Guillermo', 'Vicente', 'Markus', 'Ahmed', 'Kayden', 'Jamar', 'Triston', 
    'Howard', 'Jefferson', 'Axel', 'Kellen', 'Tomas', 'Cordell', 'Gavyn'];

  private readonly lastNames: string[] = ['Shultz', 'Cuevas', 'Rhodes', 
    'Mckenzie', 'Taylor', 'Glenn', 'Reilly', 'Morris', 'Herman', 'Beltran', 
    'Big', 'Swanson', 'Roth', 'Stone', 'Benton', 'Drake', 'Michael', 'Romero', 
    'Yu', 'Walls', 'Calderon', 'Shaffer', 'Moreno', 'Ibarra', 'Nichols', 
    'Solis', 'Kline', 'Choi', 'Trevino', 'Gonzalez', 'Contreras', 'Cervantes', 
    'Haynes', 'Kent', 'Patel', 'Dickson', 'Manning', 'Stokes', 'Hickman', 
    'Carter', 'Baldwin', 'Raymond', 'Gay', 'Cabrera', 'Deleon', 'Robertson', 
    'Wang', 'Acosta', 'Roberson', 'Vega', 'Crosby', 'Hall', 'Coleman', 'Luna', 
    'Greer', 'Chang', 'Moon', 'Myers', 'Wilkins', 'McLargeHuge'];

  private readonly farmNamePrefixes: string[] = [
    'The Frozen', 'Oakey Dokey', 'Sunset', 'Windy Willows', 'Breezy Hills', 
    'Wild Horse', 'Rolling Moss', 'Red River', 'Moonlight', 'Rolling Moss', 
    'Rock Bottom', 'Swan Lake', 'Day Break', 'Mossy Rock', 'Morning Star', 
    'Rainbow Hill', 'Burning Sands', 'Blazing Pitchfork', 'Chariot', 'Lucky Star', 
    'Ravenwood', 'Tree Hollow', 'River Neck', 'Evergreen', 'Two Pines', 
    'Mountainridge', 'Little Foot', 'Rolling Hills', 'Blueberry', 'Lone Oak', 
    'Prairie Hills', 'Strawberry Mountain', 'Waterfall', 'Mountain View', 
    'Strawberry Valley', 'Roadrunner', 'Spring Fountain', 'Crescent Canyon', 
    'Pinewood', 'Yew Valley', 'Freedom', 'Cranberry', 'Rosewood', 'Mistwood', 
    'Blackwater', 'Mooseridge', 'Sleeping Hills', 'Riverrock', 'Wildflower', 
    'Mystic Hill'];

  private readonly farmNameSuffixes: string[] = [
    'Ranch', 'Estate', 'Acres', 'Gardens', 'Fields', 'Meadow', 'Grange', 'Nursey', 
    'Range', 'Pastures', 'Orchard', 'Farmstead', 'Vineyard', 'Farm', 'Homestead', 
    'Plantation'
  ];

  private readonly farmerQuotes: string[] = [
    'I\'m beginning to feel like a Farm God.',
    'Please just don\'t bother me.',
    'I\'m not like those other farmers.',
    'Work, work.',
    'What task is there?',
    'Life is potato. I have potato blood in my veins.',
    'Something need doing?',
    'I would work faster but...',
    'It is only the farmer who faithfully plants seeds in the Spring, who reaps a harvest in the Autumn.',
    'A good farmer is nothing more nor less than a handy man with a sense of humus.',
    'A farmer has to be an optimist or he wouldn\'t still be a farmer.',
    'Eat. Sleep. Farm. Repeat.',
    'What farm animal keeps the best time? A watch dog!',
    'If a cow laughed really hard... would milk come out of her nose?',
    'What\'s the best part of farming? Getting down and dirty with my hoes.',
    'What crop grows under your nose? Tulips!',
    'My farm is in the top percentile of farms.',
    'I\'ve got nothing to say to you.'
  ];

  public newFarmerName = () => {
    return ( 
      this.maleFirstNames.sample()
      + ' ' +
      this.lastNames.sample()
    );
  }

  public newFarmQuote = () => {
    return this.farmerQuotes.sample();
  }

  public newFarmName = () => {
    return this.farmNamePrefixes.sample() + ' ' + this.farmNameSuffixes.sample();
  }
}

const repo = Object.freeze(new NameRepo());
export default repo;
