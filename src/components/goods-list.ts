interface IgoodsList {
  name: string;
  category: string;
  brand: string;
  description: string;
  code: string;
  rating: number;
  discount: number;
  stock: number;
  picture: string;
}

const goodsList: IgoodsList[] = [
  {
    name: "Tv Samsung QE50Q80AAU",
    category: "tv",
    brand: "Samsung",
    description: "Cool tv for every house",
    code: "001",
    rating: 5,
    discount: 10,
    stock: 12,
    picture: "./assets/images/tv-samsung-qe50q80aau.jpg",
  },
  {
    name: "Tv Toshiba 50C350KE",
    category: "tv",
    brand: "Toshiba",
    description: "Modern model - hit of a season!",
    code: "002",
    rating: 5,
    discount: 5,
    stock: 15,
    picture: "./assets/images/tv-toshiba-50c350ke.jpg",
  },
  {
    name: "Smartphone Apple iPhone 13 128Gb Midnight",
    category: "smartphone",
    brand: "Apple",
    description: "A well known device for life",
    code: "003",
    rating: 5,
    discount: 0,
    stock: 10,
    picture: "./assets/images/apple-iphone-13-midnight.jpg",
  },
];

export default goodsList;
