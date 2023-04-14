import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import cn from "classnames";
import { ForwardedRef, KeyboardEvent, forwardRef, useEffect, useState } from "react";
import StarIcon from "./star.svg";

export const Rating = forwardRef(({rating, isEditable = false, setRating, error, ...props}: RatingProps, ref:ForwardedRef<HTMLDivElement>): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	useEffect(() => {
		constructRating(rating);
	}, [rating]);

	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((item: JSX.Element, i: number) => {
			return (
				<span
					className={cn(styles.star, {
						[styles.filled]: i < currentRating,
            [styles.isEditable]: isEditable
					})}
          onMouseEnter={()=> changeFill(i+1)}
          onMouseLeave={()=> changeFill(rating)}
          onClick={()=>onClick(i+1)}
				>
					<StarIcon
          tabIndex={isEditable?0:-1}
          onKeyDown={(evt)=> onSpacePress(i+1,evt)}
          />
				</span>
			);
		});
		setRatingArray(updatedArray);
	};

  const changeFill = (index: number) => {
    if(!isEditable){
      return;
    }
    constructRating(index);
  };
  const onClick = (index:number) => {
    if(!isEditable || !setRating){
      return;
    }
    setRating(index);
  };
  const onSpacePress = (index:number, evt:KeyboardEvent<SVGAElement>) => {
    if(evt.code != 'Space' || !setRating){
      return;
    }
    setRating(index);
  };

	return (
		<div className={cn(styles.rating, {
      [styles.error]: error
    })}
    {...props}
    ref={ref}
    >
			{ratingArray.map((star, i) => (<span key={i}>{star}</span>))}
      {error && <span className={styles.errorMessage}>{error.message}</span>}
		</div>
	);
});
