import { SortEnum, SortProps } from "./Sort.props";
import styles from "./Sort.module.css";
import cn from "classnames";
import SortIcon from './sort.svg';

export const Sort = ({ sort, setSort, className }: SortProps): JSX.Element => {
  return (
    <div className={cn(styles.sort, className)}>
      <div className={styles.sortName} id='sort'>Сортировка</div>
      <button className={cn(styles.sortButton, styles.sortRating, {
        [styles.sortActive]: sort == SortEnum.Rating
      })}
        onClick={() => setSort(SortEnum.Rating)}
        aria-selected={sort == SortEnum.Rating}
        aria-labelledby='sort rating'
      >
        <SortIcon />
        <span id='rating'>По рэйтингу</span>
      </button>
      <button className={cn(styles.sortButton, styles.sortPrice, {
        [styles.sortActive]: sort == SortEnum.Price
      })}
        onClick={() => setSort(SortEnum.Price)}
        aria-selected={sort == SortEnum.Price}
        aria-labelledby='sort price'
      >
        <SortIcon />
        <span id='price'>По цене</span>
      </button>
    </div>
  );
};