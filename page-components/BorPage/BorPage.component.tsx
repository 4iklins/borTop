import { BorPageProps } from "./BorPage.props";
import styles from "./BorPage.module.css";
import { Htag, Tag, HhData } from '@/components';
import { menuCategory } from "@/interfaces/page.interface";

export const BorPageComponent = ({ firstCategory, page, products }: BorPageProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        {page && <Htag tag="h1">{page.title}</Htag>}
        {products && <Tag color='gray' size='large'>{products.length}</Tag>}
        <span>Сортировка</span>
      </div>
      <div>
        {products && products.map(p => <li key={p._id}>{p.title}</li>)}
      </div>
      {firstCategory == menuCategory.Courses && page && page.hh && <HhData title={page.category} {...page.hh} />}
    </div>
  );
};
