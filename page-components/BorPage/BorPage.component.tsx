import { BorPageProps } from "./BorPage.props";
import styles from "./BorPage.module.css";
import { Htag, Tag, HhData, Advantages, Product, Sort } from '@/components';
import { menuCategory } from "@/interfaces/page.interface";
import { SortEnum } from '@/components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from '../sort.reducer';
import HTMLReactParser from "html-react-parser";


export const BorPageComponent = ({ firstCategory, page, products }: BorPageProps): JSX.Element => {

  const [{ products: sortedProducts, sort }, dispatch] = useReducer(sortReducer, { sort: SortEnum.Rating, products });
  const setSort = (sort: SortEnum) => {
    dispatch({ type: sort });
  };

  useEffect(() => {
    dispatch({ type: "reset", products });
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        {page && <Htag tag="h1">{page.title}</Htag>}
        {sortedProducts && <Tag color='gray' size='large' aria-label={`Количество продуктов ${sortedProducts.length}`}>{sortedProducts.length}</Tag>}
        <Sort className={styles.sort} sort={sort} setSort={setSort} />
      </div>
      <ul className={styles.productList}>
        {sortedProducts && sortedProducts.map(p => <li key={p._id}><Product product={p} layout /></li>)}
      </ul>
      {firstCategory == menuCategory.Courses && page && page.hh && <HhData title={page.category} {...page.hh} />}
      {page.advantages && page.advantages.length != 0 &&
        <Advantages advantages={page.advantages} />
      }
      {page.seoText &&
        <div className={styles.seoText}>
          {HTMLReactParser(`<div>${page.seoText}</div>`)}
        </div>
      }
      <div className={styles.skills}>
        <Htag className={styles.skillsHead} tag='h3'>Получаемые навыки</Htag>
        {page.tags && page.tags.length != 0 &&
          page.tags.map(t => {
            return <Tag key={t} className={styles.skillsTag} color="primary" size="small">{t}</Tag>;
          })
        }
      </div>
    </div>
  );
};
