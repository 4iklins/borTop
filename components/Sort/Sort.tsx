import { SortEnum, SortProps } from "./Sort.props";
import styles from "./Sort.module.css";
import cn from "classnames";
import SortIcon from './sort.svg';

export const Sort = ({ sort, setSort, className }: SortProps): JSX.Element => {
  return (
    <div className={styles.sort}>
      <div className={cn(styles.sortRating, {
        [styles.sortActive]: sort == SortEnum.Rating
      })}
        onClick={() => setSort(SortEnum.Rating)}
      >
        <SortIcon />
        <span>По рэйтингу</span>
      </div>
      <div className={cn(styles.sortPrice, {
        [styles.sortActive]: sort == SortEnum.Price
      })}
        onClick={() => setSort(SortEnum.Price)}
      >
        <SortIcon />
        <span>По цене</span>
      </div>
    </div>
  );
};