import { ReviewFormProps } from "./ReviewForm.props";
import styles from "./ReviewForm.module.css";
import cn from "classnames";
import { Rating } from "../Rating/Rating";
import { Input } from "../Input/Input";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import CloseIcon from './close.svg';

export const ReviewForm = ({ productId ,className, ...props }: ReviewFormProps): JSX.Element => {
  
  return (
    <div className={cn(styles.reviewForm, className)}>
      <Input className={styles.name} placeholder="Имя"/>
      <Input className={styles.title} placeholder="Заголовок отзыва"/>
      <div className={styles.rate}>
        <span>Оценка:</span>
        <Rating rating={0} isEditable={true}/>
      </div>
      <Textarea className={styles.text} placeholder="Текст отзыва"/>
      <div className={styles.button}>
        <Button color="primary">Отправить</Button>
        <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
      </div>
      <div className={styles.succes}>
        <div className={styles.succesTitle}>Ваш отзыв отправлен</div>
        <div>Спасибо, ваш отзыв будет опубликован поесле проверки</div>
        <CloseIcon/>
      </div>
    </div>
  );
};