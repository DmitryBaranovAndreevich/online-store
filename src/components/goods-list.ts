import samsung from "./../images/goodsImages/tv-samsung-qe50q80aau.jpg";
import toshiba from "./../images/goodsImages/tv-toshiba-50c350ke.jpg";
import iphone from "./../images/goodsImages/apple-iphone-13-midnight.jpg";
import iphone_2 from "./../images/goodsImages/apple-iphone-13-midnight-2.jpg";
import iphone_3 from "./../images/goodsImages/apple-iphone-13-midnight-3.jpg";
import iphone_4 from "./../images/goodsImages/apple-iphone-13-midnight-4.jpg";

interface IgoodsList {
  name: string;
  category: string;
  brand: string;
  description: string;
  code: string;
  rating: number;
  discount: number;
  stock: number;
  price: number;
  picture: string | string[];
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
    price: 550,
    picture: [`url(${samsung as string})`],
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
    price: 390,
    picture: [`url(${toshiba as string})`],
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
    price: 600,
    picture: [`url(${iphone as string})`, `url(${iphone_2 as string})`, `url(${iphone_3 as string})`, `url(${iphone_4 as string})`],
  },
];

export default goodsList;
