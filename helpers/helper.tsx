import { menuCategory } from "@/interfaces/page.interface";
import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import { FirstLevelMenuItem } from '@/interfaces/menu.interface';

export const firstLevelMenu:FirstLevelMenuItem[] = [
  {route:'courses', name:'Курсы', icon:<CoursesIcon/>, id:menuCategory.Courses},
  {route:'services', name:'Сервисы', icon:<ServicesIcon/>, id:menuCategory.Services},
  {route:'books', name:'Книги', icon:<BooksIcon/>, id:menuCategory.Books},
  {route:'products', name:'Продукты', icon:<ProductsIcon/>, id:menuCategory.Products},
];