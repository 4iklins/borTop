import { AdvantagesProps } from "./Advantages.props";
import styles from "./Advantages.module.css";
import { Htag, Ptag} from '@/components';
import MarkIcon from './mark.svg';


export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <div className={styles.advantages}>
          <Htag tag="h3">Преимущества</Htag>
          <ul className={styles.advantagesList}>
            {advantages.map(a => {
              return(
                <li className={styles.advantagesItem} key={a._id}>
                  <MarkIcon/>
                  <div className={styles.advantagesTitle}>{a.title}</div>
                  <Ptag className={styles.advantagesDescription} size="large">{a.description}</Ptag>
                </li>
              );
            })}
          </ul>
        </div>
  );
};
