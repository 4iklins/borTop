import { CategoryPageProps } from "./CategoryPage.props";
import styles from "./CategoryPage.module.css";
import { Htag, Card, ProductList } from '@/components';


export const CategoryPageComponent = ({ menu, route }: CategoryPageProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.categoryList}>
        {menu && menu.map(item => <li className={styles.categoryItem} key={item._id.secondCategory}>
          <Card className={styles.category} color="white">
            <Htag tag="h1" >{item._id.secondCategory}</Htag>
            <ProductList pages={item.pages} route={route}/>
          </Card>
        </li>)}
      </ul>
    </div>
  );
};
