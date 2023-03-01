import styles from "./Menu.module.css";
import cn from "classnames";
import { useContext } from 'react';
import { AppContext } from '@/context/app.context';
import { FirstLevelMenu, PageItem } from '@/interfaces/menu.interface';
import { menuCategory } from "@/interfaces/page.interface";
import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import Link from "next/link";
import { useRouter } from "next/router";

const firstLevelMenu:FirstLevelMenu[] = [
  {route:'/courses', name:'Курсы', icon:<CoursesIcon/>, id:menuCategory.Courses},
  {route:'/services', name:'Сервисы', icon:<ServicesIcon/>, id:menuCategory.Services},
  {route:'/books', name:'Книги', icon:<BooksIcon/>, id:menuCategory.Books},
  {route:'/products', name:'Продукты', icon:<ProductsIcon/>, id:menuCategory.Products},
];

export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const router = useRouter();

  const openSecondLevelMenu = (secondCategory:string) => {
    setMenu && setMenu(menu.map(m => {
      if(m._id.secondCategory == secondCategory){
        m.isOpen = !m.isOpen;
      }
      return m;
    }));
  };


  const buildFirstLevelMenu = () => {
    return(
      <>
        {firstLevelMenu.map(menuItem => {
          return (
            <div className={styles.firstLevelMenuItem} key={menuItem.route}>
              <Link href={`${menuItem.route}`}>
                <div className={cn(styles.firstLevelMenuHead, {[styles.firstLevelMenuHeadActive]:menuItem.id == firstCategory})}>
                  {menuItem.icon}
                  <span>{menuItem.name}</span>
                </div>
              </Link>
              {firstCategory === menuItem.id && buildSecondLevelMenu(menuItem)}
            </div>
          );
        })}
      </>
    );
  };

  const buildSecondLevelMenu = (FirsLevelMenuItem:FirstLevelMenu) => {
    return(
      <ul className={styles.secondLevelMenu}>
        {menu.map((menuItem) => {
          if(menuItem.pages.map((p => p.alias)).includes(router.asPath.split('/')[2])){
            menuItem.isOpen = true;
          }
          return (
          <li className={styles.secondLevelMenuItem} key={menuItem._id.secondCategory}>
            <div className={cn(styles.secondLevelMenuHead)} 
              onClick={()=> openSecondLevelMenu(menuItem._id.secondCategory)}>{menuItem._id.secondCategory}</div>
            <div className={cn(styles.thirdLevelMenu,{[styles.thirdLevelMenuOpen]: menuItem.isOpen})}>
              {buildThirdLevelMenu(FirsLevelMenuItem, menuItem.pages)}
            </div>
          </li>
        );})}
      </ul>
    );
  };

  const buildThirdLevelMenu = (FirsLevelMenuItem:FirstLevelMenu,pages:PageItem[]) => {
    return(
        <ul>
          {pages.map(page => (
            <li className={cn(styles.thirdLevelMenuItem,{
              [styles.thirdLevelMenuItemActive]:`${FirsLevelMenuItem.route}/${page.alias}` == router.asPath
            })} 
              key={page.alias}>
              <Link href={`${FirsLevelMenuItem.route}/${page.alias}`}>
                {page.category}
              </Link>
            </li>
          ))}
        </ul>
    );
  };

  return (
    <div className={styles.firstLevelMenu}>
      {buildFirstLevelMenu()}
    </div>
  );
};