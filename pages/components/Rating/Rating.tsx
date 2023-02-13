import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import cn from "classnames";
import { useEffect, useState } from 'react';
import StarIcon from './star.svg';

export const Rating = ({ rating, isEditable = false, setRating, ...props }: RatingProps): JSX.Element => {

  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((item: JSX.Element, i: number) => {
      return <StarIcon className={cn(styles.star, {
        [styles.filled]: i < currentRating
      })}
      />;
    });
    setRatingArray(updatedArray);
  };


  return (
    <div {...props}>
      {ratingArray.map((star, i) => <span key={i}>{star}</span>)}
    </div>
  );
};