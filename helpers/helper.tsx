import { menuCategory } from "@/interfaces/page.interface";
import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import { FirstLevelMenuItem } from '@/interfaces/menu.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
  { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: menuCategory.Courses },
  { route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: menuCategory.Services },
  { route: 'books', name: 'Книги', icon: <BooksIcon />, id: menuCategory.Books },
  { route: 'products', name: 'Продукты', icon: <ProductsIcon />, id: menuCategory.Products },
];

export const priceRu = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    currencyDisplay: 'symbol',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(price);
};

export const declOfNum = (num: number, titles: [string, string, string]): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 5 < 10) ? num % 10 : 5]];
};