import { BorPageProps } from "./BorPage.props";
import styles from "./BorPage.module.css";
import { Htag, Tag, HhData, Advantages, Ptag } from '@/components';
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
      {page.advantages && page.advantages.length != 0 && 
        <Advantages advantages={page.advantages}/>
      }
      {page.seoText &&  
        <Ptag size="large">{page.seoText}</Ptag>
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
