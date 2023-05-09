import styles from "./Menu.module.css";
import cn from "classnames";
import { KeyboardEvent, useContext, useState } from 'react';
import { AppContext } from '@/context/app.context';
import { FirstLevelMenuItem, PageItem } from '@/interfaces/menu.interface';
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from '@/helpers/helper';
import { motion } from 'framer-motion';



export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
  const router = useRouter();

  const openSecondLevelMenu = (secondCategory: string) => {
    setMenu && setMenu(menu.map(m => {
      if (m._id.secondCategory == secondCategory) {
        setAnnounce(m.isOpen ? 'closed' : 'opened');
        m.isOpen = !m.isOpen;
      }
      return m;
    }));
  };

  const openSecondLevelKey = (e: KeyboardEvent, secondCategory: string) => {
    if (e.code == "Space" || e.code == "Enter") {
      e.preventDefault();
      openSecondLevelMenu(secondCategory);
    }
  };

  const variants = {
    visible: {
      marginTop: 13,
      marginBottom: 20,
      transition: {

        staggerChildren: 0.1
      }
    },
    hidden: {
      marginTop: 0,
      marginBottom: 0
    }
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 'auto',
      marginBottom: 10
    },
    hidden: {
      opacity: 0,
      height: 0,
      marginBottom: 0
    }
  };


  const buildFirstLevelMenu = () => {
    return (
      <ul role='navigation'>
        {firstLevelMenu.map(menuItem => {
          return (
            <li className={styles.firstLevelMenuItem} key={menuItem.route} aria-expanded={firstCategory === menuItem.id}>
              <Link href={`/${menuItem.route}`}>
                <div className={cn(styles.firstLevelMenuHead, { [styles.firstLevelMenuHeadActive]: menuItem.id == firstCategory })}>
                  {menuItem.icon}
                  <span>{menuItem.name}</span>
                </div>
              </Link>
              {firstCategory === menuItem.id && buildSecondLevelMenu(menuItem)}
            </li>
          );
        })}
      </ul>
    );
  };

  const buildSecondLevelMenu = (FirsLevelMenuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondLevelMenu}>
        {menu.map((menuItem) => {
          if (menuItem.pages.map((p => p.alias)).includes(router.asPath.split('/')[2])) {
            menuItem.isOpen = true;
          }
          return (
            <li className={styles.secondLevelMenuItem} key={menuItem._id.secondCategory}>
              <button
                className={cn(styles.secondLevelMenuHead)}
                onClick={() => openSecondLevelMenu(menuItem._id.secondCategory)}
                aria-expanded={menuItem.isOpen}
                onKeyDown={(e) => openSecondLevelKey(e, menuItem._id.secondCategory)}
              >{menuItem._id.secondCategory}
              </button>
              <motion.div className={cn(styles.thirdLevelMenu)}
                layout
                variants={variants}
                initial={menuItem.isOpen ? 'visible' : 'hidden'}
                animate={menuItem.isOpen ? 'visible' : 'hidden'}
              >
                {buildThirdLevelMenu(FirsLevelMenuItem.route, menuItem.pages, menuItem.isOpen ?? false)}
              </motion.div>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevelMenu = (route: string, pages: PageItem[], isOpen: boolean) => {
    return (
      <ul>
        {pages.map(page => (
          <motion.li className={cn(styles.thirdLevelMenuItem, {
            [styles.thirdLevelMenuItemActive]: `/${route}/${page.alias}` == router.asPath
          })}
            key={page.alias}
            variants={variantsChildren}
            aria-current={`/${route}/${page.alias}` == router.asPath ? 'date' : 'false'}
          >
            <Link href={`/${route}/${page.alias}`} tabIndex={isOpen ? 0 : -1}>
              {page.category}
            </Link>
          </motion.li>
        ))}
      </ul>
    );
  };

  return (
    <nav className={styles.firstLevelMenu}>
      {announce && <span className='visuallyHidden' role='log'>{announce === 'opened' ? 'развернуто' : 'свернуто'}</span>}
      {buildFirstLevelMenu()}
    </nav>
  );
};