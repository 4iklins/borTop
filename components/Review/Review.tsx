import { ReviewProps } from "./Review.props";
import styles from "./Review.module.css";
import cn from "classnames";
import UserIcon from "./user.svg";
import { Rating } from "../Rating/Rating";
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';
import { Ptag } from "../Ptag/Ptag";

export const Review = ({ review ,className }: ReviewProps): JSX.Element => {
  const {name,title,description,rating,createdAt} = review;
  return (
    <div className={cn(styles.review, className)}>
      <UserIcon className={styles.icon}/>
      <div className={styles.name}>{name}:</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.rating}>
        <span className={styles.date}>{format(new Date(createdAt), 'dd MMMM yyyy', {locale:ru})}</span>
        <Rating rating={rating}/>
      </div>
      <Ptag size="small" className={styles.description}>{description}</Ptag>
      <hr className={styles.hr} color="#EBEBEB"/>
    </div>
  );
};