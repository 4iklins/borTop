import { ProductListProps } from "./ProductList.props";
import styles from "./ProductList.module.css";
import cn from "classnames";
import { Button , Card, Htag } from "@/components";
import { motion } from 'framer-motion';
import Link from "next/link";
import { useState } from "react";

export const ProductList = ({ pages, route, className }: ProductListProps): JSX.Element => {
  const [opened , setOpened] = useState<boolean>(false);
  const showList = () => {
    setOpened(!opened);
  };
  const variants = {
    opened:{
      height:'auto',
      marginTop: 20,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    closed:{
      height: 0,
      marginTop:0
    }
  };

  const variantsChildren = {
    opened: {
      opacity: 1,
      height: 'auto'
    },
    closed: {
      opacity: 0,
      height: 0
    }
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      <Button  className={styles.button}
      color="primary" arrow={opened ? 'down': 'right'}
      onClick={showList}
      aria-expanded = {opened}
      >Подробнее
      </Button>
      <motion.ul className={styles.productList}
      layout
      variants={variants}
      initial = 'closed'
      animate = {opened ? 'opened' : 'closed'}
      >
        {pages.map(p => <motion.li
        className={styles.priductItem}
        key={p.alias}
        variants={variantsChildren}
        >
        <Link href={`/${route}/${p.alias}`}><Card className={styles.card} color="blue">{p.category}</Card></Link>
        </motion.li>)}
      </motion.ul>
    </div>
  );
};
