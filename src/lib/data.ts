import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import f1 from "@/assets/feed-1.jpg";
import f2 from "@/assets/feed-2.jpg";
import f3 from "@/assets/feed-3.jpg";
import f4 from "@/assets/feed-4.jpg";
import f5 from "@/assets/feed-5.jpg";
import f6 from "@/assets/feed-6.jpg";

export type Roast = "hell" | "mittel" | "dunkel" | "omni";
export type Brew = "espresso" | "filter" | "milch";
export type Aroma =
  | "Schokoladig"
  | "Nussig"
  | "Fruchtig"
  | "Floral"
  | "Karamellig"
  | "Würzig"
  | "Kräftig"
  | "Mild";

export type Product = {
  id: string;
  name: string;
  roastery: string;
  origin: string;
  region: string;
  roast: Roast;
  brews: Brew[];
  aromas: Aroma[];
  notes: string[];
  price: number;
  image: string;
  bio?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "kenya-nyeri",
    name: "Kenya Nyeri AA",
    roastery: "Drei Höfe Rösterei",
    origin: "Kenia",
    region: "Nyeri",
    roast: "hell",
    brews: ["filter"],
    aromas: ["Fruchtig", "Floral"],
    notes: ["Schwarze Johannisbeere", "Hibiskus", "Honig"],
    price: 14.5,
    image: p1,
    bio: true,
  },
  {
    id: "brazil-mogiana",
    name: "Brazil Mogiana",
    roastery: "Hafenröster",
    origin: "Brasilien",
    region: "Mogiana",
    roast: "dunkel",
    brews: ["espresso", "milch"],
    aromas: ["Schokoladig", "Nussig", "Kräftig"],
    notes: ["Kakao", "Haselnuss", "Karamell"],
    price: 12.9,
    image: p2,
  },
  {
    id: "ethiopia-yirgacheffe",
    name: "Ethiopia Yirgacheffe",
    roastery: "Wiesengold",
    origin: "Äthiopien",
    region: "Yirgacheffe",
    roast: "hell",
    brews: ["filter"],
    aromas: ["Fruchtig", "Floral", "Mild"],
    notes: ["Bergamotte", "Jasmin", "Pfirsich"],
    price: 16.0,
    image: p3,
    bio: true,
  },
  {
    id: "colombia-huila",
    name: "Colombia Huila",
    roastery: "Drei Höfe Rösterei",
    origin: "Kolumbien",
    region: "Huila",
    roast: "mittel",
    brews: ["espresso", "filter"],
    aromas: ["Karamellig", "Nussig", "Schokoladig"],
    notes: ["Milchschokolade", "Mandel", "Rohrzucker"],
    price: 13.5,
    image: p1,
  },
  {
    id: "guatemala-huehue",
    name: "Guatemala Huehuetenango",
    roastery: "Stadtkind Coffee",
    origin: "Guatemala",
    region: "Huehuetenango",
    roast: "mittel",
    brews: ["espresso", "filter", "milch"],
    aromas: ["Schokoladig", "Würzig"],
    notes: ["Zartbitter", "Zimt", "Orangenschale"],
    price: 13.9,
    image: p2,
  },
  {
    id: "indonesia-sumatra",
    name: "Sumatra Mandheling",
    roastery: "Hafenröster",
    origin: "Indonesien",
    region: "Sumatra",
    roast: "dunkel",
    brews: ["espresso", "milch"],
    aromas: ["Würzig", "Kräftig", "Schokoladig"],
    notes: ["Erde", "Tabak", "Bitterschokolade"],
    price: 12.5,
    image: p2,
  },
  {
    id: "costa-rica-tarrazu",
    name: "Costa Rica Tarrazú",
    roastery: "Wiesengold",
    origin: "Costa Rica",
    region: "Tarrazú",
    roast: "mittel",
    brews: ["filter", "espresso"],
    aromas: ["Karamellig", "Fruchtig"],
    notes: ["Aprikose", "Honig", "Vanille"],
    price: 14.0,
    image: p3,
    bio: true,
  },
  {
    id: "house-omni",
    name: "Barista State Omni",
    roastery: "Barista State",
    origin: "Blend",
    region: "Multi-Origin",
    roast: "omni",
    brews: ["espresso", "filter", "milch"],
    aromas: ["Schokoladig", "Nussig", "Mild"],
    notes: ["Karamell", "Walnuss", "Toffee"],
    price: 11.9,
    image: p1,
  },
];

export const AROMAS: Aroma[] = [
  "Schokoladig",
  "Nussig",
  "Fruchtig",
  "Floral",
  "Karamellig",
  "Würzig",
  "Kräftig",
  "Mild",
];

export type Post = {
  id: string;
  category:
    | "Heimrösten"
    | "Espresso"
    | "Filterkaffee"
    | "Röstereien"
    | "Setups"
    | "Guides"
    | "Herkunft"
    | "Produktwissen";
  title: string;
  teaser: string;
  author: string;
  readTime: string;
  image: string;
  aspect: "tall" | "wide" | "square";
};

export const POSTS: Post[] = [
  {
    id: "1",
    category: "Espresso",
    title: "Der Espresso, der süß wird, wenn du wartest",
    teaser: "Wie kleine Veränderungen an Mahlgrad und Brühzeit deinen Shot komplett verändern.",
    author: "Lena · Wiesengold",
    readTime: "6 min",
    image: f1,
    aspect: "tall",
  },
  {
    id: "2",
    category: "Setups",
    title: "Ein ruhiges Setup für Vielbrüher",
    teaser: "Eine Werkbank für jeden Morgen — ohne Lärm, ohne Hektik.",
    author: "Marlon",
    readTime: "8 min",
    image: f2,
    aspect: "wide",
  },
  {
    id: "3",
    category: "Herkunft",
    title: "Wenn Kirschen reifen — eine Saison in Kenia",
    teaser: "Notizen von einer Reise durch Nyeri, zwischen Höhe, Geduld und Sonne.",
    author: "Drei Höfe",
    readTime: "11 min",
    image: f3,
    aspect: "tall",
  },
  {
    id: "4",
    category: "Heimrösten",
    title: "Dein erster First Crack",
    teaser: "Was dieser Moment bedeutet — und warum du ihn lieben wirst.",
    author: "Barista State",
    readTime: "5 min",
    image: f4,
    aspect: "wide",
  },
  {
    id: "5",
    category: "Röstereien",
    title: "Im Trommelraum mit Hafenröster",
    teaser: "Ein Vormittag zwischen Wärme, Geräusch und Aroma.",
    author: "Hafenröster",
    readTime: "9 min",
    image: f5,
    aspect: "tall",
  },
  {
    id: "6",
    category: "Guides",
    title: "Moka, neu gelesen",
    teaser: "Warum die Moka-Kanne mehr kann, als du denkst.",
    author: "Barista State",
    readTime: "4 min",
    image: f6,
    aspect: "square",
  },
  {
    id: "7",
    category: "Filterkaffee",
    title: "V60 für Menschen mit wenig Zeit",
    teaser: "Drei Schritte, drei Minuten, ein Filter, der hält.",
    author: "Lena",
    readTime: "5 min",
    image: f2,
    aspect: "wide",
  },
  {
    id: "8",
    category: "Produktwissen",
    title: "Wie alt darf dein Kaffee sein?",
    teaser: "Frische, Reifung und der ehrliche Blick aufs Röstdatum.",
    author: "Barista State",
    readTime: "3 min",
    image: f4,
    aspect: "square",
  },
];

export type Roastery = {
  name: string;
  city: string;
  region: string;
  aromas: Aroma[];
  intro: string;
  image: string;
};

export const ROASTERIES: Roastery[] = [
  {
    name: "Drei Höfe Rösterei",
    city: "Leipzig",
    region: "Sachsen",
    aromas: ["Fruchtig", "Floral"],
    intro: "Helle Röstungen mit klarem Profil, viel Geduld im Drum.",
    image: f5,
  },
  {
    name: "Hafenröster",
    city: "Hamburg",
    region: "Norddeutschland",
    aromas: ["Schokoladig", "Kräftig"],
    intro: "Dunkle, runde Espresso-Röstungen direkt am Hafen.",
    image: f4,
  },
  {
    name: "Wiesengold",
    city: "München",
    region: "Bayern",
    aromas: ["Karamellig", "Nussig"],
    intro: "Single Origin Filter und sortenreine Espressi mit Sorgfalt.",
    image: f6,
  },
  {
    name: "Stadtkind Coffee",
    city: "Köln",
    region: "NRW",
    aromas: ["Würzig", "Mild"],
    intro: "Junge Rösterei mit kuratierten Mikro-Lots aus Mittelamerika.",
    image: f2,
  },
];

export const HEIMROESTER = [
  {
    id: "r1",
    name: "BST One",
    subtitle: "Der Einstieg in dein Heimrösten",
    capacity: "250 g pro Röstung",
    time: "10–14 min",
    price: 549,
    image: p2,
  },
  {
    id: "r2",
    name: "BST Studio",
    subtitle: "Mehr Kontrolle, mehr Profile",
    capacity: "500 g pro Röstung",
    time: "12–16 min",
    price: 949,
    image: p2,
  },
];
