import { HhDtatProps } from "./HhData.props";
import styles from "./HhData.module.css";
import { Htag } from '../Htag/Htag';
import { Tag } from '../Tag/Tag';
import { Card } from '../Card/Card';

export const HhData = ({ title, count, juniorSalary, middleSalary, seniorSalary, _id, updatedAt }: HhDtatProps): JSX.Element => {
  return (
    <div className={styles.hhdata}>
      <div className={styles.head}>
        <Htag tag="h2">Вакансии - {title}</Htag>
        <Tag size='small' color='red'>hh.ru</Tag>
      </div>
      <Card color='white'>
        card
      </Card>
    </div>
  );
};
