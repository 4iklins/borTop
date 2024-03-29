import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import cn from "classnames";
import { ForwardedRef, KeyboardEvent, forwardRef, useEffect, useRef, useState } from "react";
import StarIcon from "./star.svg";

export const Rating = forwardRef(({ rating, isEditable = false, setRating, error, tabIndex, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
  const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    constructRating(rating);
  }, [rating, tabIndex]);

  const computeFocus = (rating: number, index: number): number => {
    if (!isEditable) return -1;
    if (!rating && index == 0) return tabIndex ?? 0;
    if (rating == index + 1) return tabIndex ?? 0;
    return -1;
  };

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((item: JSX.Element, i: number) => {
      return (
        <span
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.isEditable]: isEditable
          })}
          onMouseEnter={() => changeFill(i + 1)}
          onMouseLeave={() => changeFill(rating)}
          onClick={() => onClick(i + 1)}
          tabIndex={computeFocus(rating, i)}
          onKeyDown={(evt) => handleKey(evt)}
          ref={item => ratingArrayRef.current?.push(item)}
          role={isEditable ? 'slider' : ''}
          aria-valuenow={rating}
          aria-valuemax={5}
          aria-valuemin={1}
          aria-label={isEditable ? 'Поставте оценку стрелками вверх или вниз' : `Рейтинг ${rating}`}
          aria-invalid={error ? true : false}
        >
          <StarIcon />
        </span>
      );
    });
    setRatingArray(updatedArray);
  };

  const changeFill = (index: number) => {
    if (!isEditable) {
      return;
    }
    constructRating(index);
  };
  const onClick = (index: number) => {
    if (!isEditable || !setRating) {
      return;
    }
    setRating(index);
  };
  const handleKey = (evt: KeyboardEvent) => {
    if (!isEditable || !setRating) return;
    if (evt.code == 'ArrowUp' || evt.code == 'ArrowRight') {
      if (!rating) {
        setRating(1);
      } else {
        evt.preventDefault();
        setRating(rating < 5 ? rating + 1 : 5);
        ratingArrayRef.current[rating]?.focus();
      }
    }
    if (evt.code == 'ArrowDown' || evt.code == 'ArrowLeft') {
      evt.preventDefault();
      setRating(rating > 1 ? rating - 1 : 1);
      ratingArrayRef.current[rating - 2]?.focus();
    }
  };

  return (
    <div className={cn(styles.rating, {
      [styles.error]: error
    })}
      {...props}
      ref={ref}
    >
      {ratingArray.map((star, i) => (<span key={i}>{star}</span>))}
      {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});
