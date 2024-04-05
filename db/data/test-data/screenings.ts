import { Screening } from "../interfaces.js"

const screenings: Screening[] = [ 
  {
    date: 1714582800,
    location: "123 Waterloo Road, London, L1 4HK",
    cost: 0,
    isPayWhatYouWant: true,
    tmdb_id: 489,
    title: "Good Will Hunting",
    year: 1997,
    poster_url: "https://image.tmdb.org/t/p/original/bABCBKYBK7A5G1x0FzoeoNfuj2.jpg",
    backdrop_url: "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/4ywKTlsIllvQYRiZJPwYACJIHY8.jpg",
    logo_url: "https://image.tmdb.org/t/p/original/357AN6S2UIfoJrt4DKPMDwwhWe2.png",
    description: "When professors discover that an aimless janitor is also a math genius, a therapist helps the young man confront the demons that are holding him back."
  },
  {
    date: Date.now() + 86400000, 
    location: "Stonehenge, Amesbury, Salisbury SP4 7DE, England",
    cost: 1500,
    isPayWhatYouWant: false,
    tmdb_id: 45678,
    title: "The Shawshank Redemption",
    year: 1994,
    poster_url: "https://example.com/poster4.jpg",
    backdrop_url: "https://example.com/backdrop4.jpg",
    logo_url: "https://example.com/logo4.jpg",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
  },
  {
    date: Date.now() + 2 * 86400000, 
    location: "10 Downing Street, London, England",
    cost: 0,
    isPayWhatYouWant: false,
    tmdb_id: 56789,
    title: "Pulp Fiction",
    year: 1994,
    poster_url: "https://example.com/poster5.jpg",
    backdrop_url: "https://example.com/backdrop5.jpg",
    logo_url: "https://example.com/logo5.jpg",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
  },
  {
    date: Date.now() + 3 * 86400000,
    location: "Buckingham Palace, London SW1A 1AA, England",
    cost: 1000,
    isPayWhatYouWant: false,
    tmdb_id: 67890,
    title: "Forrest Gump",
    year: 1994,
    poster_url: "https://example.com/poster6.jpg",
    backdrop_url: "https://example.com/backdrop6.jpg",
    logo_url: "https://example.com/logo6.jpg",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart."
  },
  {
    date: Date.now() + 4 * 86400000,
    location: "221B Baker St, Marylebone, London NW1 6XE, England",
    cost: 1800,
    isPayWhatYouWant: false,
    tmdb_id: 78901,
    title: "The Godfather",
    year: 1972,
    poster_url: "https://example.com/poster7.jpg",
    backdrop_url: "https://example.com/backdrop7.jpg",
    logo_url: "https://example.com/logo7.jpg",
    description: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son."
  },
  {
    date: Date.now() + 5 * 86400000, 
    location: "Tower of London, London EC3N 4AB, England",
    cost: 0,
    isPayWhatYouWant: true,
    tmdb_id: 89012,
    title: "The Dark Knight",
    year: 2008,
    poster_url: "https://example.com/poster8.jpg",
    backdrop_url: "https://example.com/backdrop8.jpg",
    logo_url: "https://example.com/logo8.jpg",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
  },
  {
    date: Date.now() + 6 * 86400000, 
    location:"Westminster Abbey, 20 Deans Yd, Westminster, London SW1P 3PA, England",
    cost: 500,
    isPayWhatYouWant: false,
    tmdb_id: 90123,
    title: "Fight Club",
    year: 1999,
    poster_url: "https://example.com/poster9.jpg",
    backdrop_url: "https://example.com/backdrop9.jpg",
    logo_url: "https://example.com/logo9.jpg",
    description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more."
  },
  {
    date: Date.now() + 7 * 86400000, 
    location: "Edinburgh Castle, Castlehill, Edinburgh EH1 2NG, Scotland",
    cost: 750,
    isPayWhatYouWant: false,
    tmdb_id: 12345,
    title: "The Matrix",
    year: 1999,
    poster_url: "https://example.com/poster10.jpg",
    backdrop_url: "https://example.com/backdrop10.jpg",
    logo_url: "https://example.com/logo10.jpg",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
  },
  {
    date: Date.now() - 3 * 86400000, // Three days ago
    location: "29 Acacia Road, Nuttytown, England",
    cost: 1250,
    isPayWhatYouWant: false,
    tmdb_id: 12345,
    title: "The Lion King",
    year: 1994,
    poster_url: "https://example.com/poster1.jpg",
    backdrop_url: "https://example.com/backdrop1.jpg",
    logo_url: "https://example.com/logo1.jpg",
    description: "A young lion returns to reclaim the throne that was stolen from him and his father by his treacherous uncle after spending his childhood in exile under the care of a friendly warthog and meerkat."
  },
  {
    date: Date.now() - 2 * 86400000, // Two days ago
    location: "4 Privet Drive, Little Whinging, England",
    cost: 0,
    isPayWhatYouWant: true,
    tmdb_id: 23456,
    title: "Harry Potter and the Philosopher's Stone",
    year: 2001,
    poster_url: "https://example.com/poster2.jpg",
    backdrop_url: "https://example.com/backdrop2.jpg",
    logo_url: "https://example.com/logo2.jpg",
    description: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world."
  },
  {
    date: Date.now() - 86400000, // Yesterday
    location: "12 Grimmauld Place, London, England",
    cost: 800,
    isPayWhatYouWant: false,
    tmdb_id: 34567,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    poster_url: "https://example.com/poster3.jpg",
    backdrop_url: "https://example.com/backdrop3.jpg",
    logo_url: "https://example.com/logo3.jpg",
    description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron."
  },
  {
    date: Date.now() - 5 * 86400000, // Five days ago
    location: "Baker Street, London, England",
    cost: 1800,
    isPayWhatYouWant: false,
    tmdb_id: 45678,
    title: "Sherlock Holmes",
    year: 2009,
    poster_url: "https://example.com/poster4.jpg",
    backdrop_url: "https://example.com/backdrop4.jpg",
    logo_url: "https://example.com/logo4.jpg",
    description: "Detective Sherlock Holmes and his stalwart partner Watson engage in a battle of wits and brawn with a nemesis whose plot is a threat to all of England."
  },
  {
    date: Date.now() - 7 * 86400000, // Seven days ago
    location: "4 Privet Drive, Little Whinging, England",
    cost: 0,
    isPayWhatYouWant: false,
    tmdb_id: 56789,
    title: "Harry Potter and the Chamber of Secrets",
    year: 2002,
    poster_url: "https://example.com/poster5.jpg",
    backdrop_url: "https://example.com/backdrop5.jpg",
    logo_url: "https://example.com/logo5.jpg",
    description: "An ancient prophecy seems to be coming true when a mysterious presence begins stalking the corridors of a school of magic and leaving its victims paralyzed."
  },
  {
    date: Date.now() - 6 * 86400000, // Six days ago
    location: "4 Privet Drive, Little Whinging, England",
    cost: 1400,
    isPayWhatYouWant: false,
    tmdb_id: 67890,
    title: "Harry Potter and the Prisoner of Azkaban",
    year: 2004,
    poster_url: "https://example.com/poster6.jpg",
    backdrop_url: "https://example.com/backdrop6.jpg",
    logo_url: "https://example.com/logo6.jpg",
    description: "It's Harry's third year at Hogwarts; not only does he have a new 'Defense Against the Dark Arts' teacher, but there is also trouble brewing. Convicted murderer Sirius Black has escaped the Wizards' Prison and is coming after Harry."
  },
  {
    date: Date.now() - 4 * 86400000, // Four days ago
    location: "Hogwarts Castle, Scotland",
    cost: 200,
    isPayWhatYouWant: false,
    tmdb_id: 78901,
    title: "Harry Potter and the Goblet of Fire",
    year: 2005,
    poster_url: "https://example.com/poster7.jpg",
    backdrop_url: "https://example.com/backdrop7.jpg",
    logo_url: "https://example.com/logo7.jpg",
    description: "Harry Potter finds himself competing in a hazardous tournament between rival schools of magic, but he is distracted by recurring nightmares."
  },
  {
    date: Date.now() - 8 * 86400000, // Eight days ago
    location: "4 Privet Drive, Little Whinging, England",
    cost: 0,
    isPayWhatYouWant: true,
    tmdb_id: 89012,
    title: "Harry Potter and the Order of the Phoenix",
    year: 2007,
    poster_url: "https://example.com/poster8.jpg",
    backdrop_url: "https://example.com/backdrop8.jpg",
    logo_url: "https://example.com/logo8.jpg",
    description: "With their warning about Lord Voldemort's return scoffed at, Harry and Dumbledore are targeted by the Wizard authorities as an authoritarian bureaucrat slowly seizes power at Hogwarts."
  },
  {
    date: Date.now() - 9 * 86400000, // Nine days ago
    location: "Baker Street, London, England",
    cost: 1450,
    isPayWhatYouWant: false,
    tmdb_id: 90123,
    title: "The Imitation Game",
    year: 2014,
    poster_url: "https://example.com/poster9.jpg",
    backdrop_url: "https://example.com/backdrop9.jpg",
    logo_url: "https://example.com/logo9.jpg",
    description: "During World War II, the English mathematical genius Alan Turing tries to crack the German Enigma code with help from fellow mathematicians."
  },
  {
    date: Date.now() - 10 * 86400000, // Ten days ago
    location: "The Leaky Cauldron, London, England",
    cost: 1800,
    isPayWhatYouWant: false,
    tmdb_id: 11111,
    title: "Fantastic Beasts and Where to Find Them",
    year: 2016,
    poster_url: "https://example.com/poster10.jpg",
    backdrop_url: "https://example.com/backdrop10.jpg",
    logo_url: "https://example.com/logo10.jpg",
    description: "The adventures of writer Newt Scamander in New York's secret community of witches and wizards seventy years before Harry Potter reads his book in school."
  }
]

module.exports = screenings
