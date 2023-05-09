import { HhDtatProps } from "./HhData.props";
import styles from "./HhData.module.css";
import { Htag, Tag, Card } from '@/components';
import Star from './star.svg';
import { priceRu } from "@/helpers/helper";

export const HhData = ({ title, count, juniorSalary, middleSalary, seniorSalary, _id, updatedAt }: HhDtatProps): JSX.Element => {
  return (
    <div className={styles.hhdata}>
      <div className={styles.head}>
        <Htag tag="h2">Вакансии - {title}</Htag>
        <Tag size='small' color='red'>hh.ru</Tag>
      </div>
      <Card color='white' className={styles.countWrapper}>
        <div className={styles.countTitle}>Всего вакансий</div>
        <div className={styles.count}>{count}</div>
      </Card>
      <Card color='white' className={styles.salary}>
        <div className={styles.salaryWrapper}>
          <div className={styles.salaryTitle}>Начальный</div>
          <div className={styles.salaryPrice}>{priceRu(juniorSalary)}</div>
          <div className={styles.salaryRating}>
            <Star className={styles.filled} />
            <Star />
            <Star />
          </div>
        </div>
        <div className={styles.salaryWrapper}>
          <div className={styles.salaryTitle}>Средний</div>
          <div className={styles.salaryPrice}>{priceRu(middleSalary)}</div>
          <div className={styles.salaryRating}>
            <Star className={styles.filled} />
            <Star className={styles.filled} />
            <Star />
          </div>
        </div>
        <div className={styles.salaryWrapper}>
          <div className={styles.salaryTitle}>Профессионал</div>
          <div className={styles.salaryPrice}>{priceRu(seniorSalary)}</div>
          <div className={styles.salaryRating}>
            <Star className={styles.filled} />
            <Star className={styles.filled} />
            <Star className={styles.filled} />
          </div>
        </div>
      </Card>
    </div>
  );
};
