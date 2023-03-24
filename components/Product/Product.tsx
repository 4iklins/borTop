import { ProductProps } from "./Product.props";
import styles from "./Product.module.css";
import cn from "classnames";
import { Button, Card, Htag, Ptag, Rating, Tag, Review, ReviewForm } from "@/components";
import {declOfNum, priceRu} from '@/helpers/helper';
import Image from "next/image";
import { useState } from "react";

export const Product = ({product, className}: ProductProps): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false)
  const toggleReview = () => {
    setIsReviewOpened(!isReviewOpened)
  }

	return (
    <>
		<Card className={cn(styles.product, className)}>
			<div className={styles.image}>
        <Image src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
        alt={product.title}
        width={70}
        height={70}
         />
      </div>
      <Htag tag="h3" className={styles.title}>{product.title}</Htag>
      <div className={styles.price}>
        {priceRu(product.price)}
        {product.oldPrice && <Tag className={styles.oldPrice} color="green">{priceRu(product.price - product.oldPrice)}</Tag>}
      </div>
      <div className={styles.credit}>{priceRu(product.credit)}<span>/мес</span></div>
      <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating}/></div>
      <div className={styles.categories}>{product.categories.map(c => <Tag className={styles.category} color="ghost">{c}</Tag>)}</div>
      <div className={styles.priceTitle}>цена</div>
      <div className={styles.creditTitle}>в кредит</div>
      <div className={styles.review}>{product.reviewCount} {declOfNum(product.reviewCount,['отзыв','отзыва','отзывов'])}</div>
      <hr className={cn(styles.hr,styles.hr1)} color="#EBEBEB"/>
      <Ptag className={styles.description} size="medium">{product.description}</Ptag>

      <div className={styles.characteristicsBlock}>
        <ul className={styles.characteristics}>
          {product.characteristics.map(c => <li key={c.name}>
            <span className={styles.characteristicName}>{c.name}</span>
            <span className={styles.dot}></span>
            <span className={styles.characteristicValue}>{c.value}</span>
          </li>)}
        </ul>
        <div className={styles.tags}>{product.tags.map(t => <Tag className={styles.tag} color="ghost">{t}</Tag>)}</div>
      </div>

      <div className={styles.advantagesBlock}>
        <div className={styles.advantages}>
          <div className={styles.advantagesTitle}>Преимущества</div>
          <div>{product.advantages}</div>
        </div>
        <div className={styles.disadvantages}>
          <div className={styles.advantagesTitle}>Недостатки</div>
          <div>{product.disadvantages}</div>
        </div>
      </div>
      <hr className={cn(styles.hr,styles.hr2)} color="#EBEBEB"/>
      <div className={styles.actions}>
        <Button color="primary">Узнать подробнее</Button>
        <Button color="ghost" arrow={isReviewOpened ? "down":"right"} onClick={product.reviews.length > 0 ? toggleReview : undefined}>Читать отзывы</Button>
      </div>
		</Card> 
    <Card color="blue" className={cn(styles.reviews,{
      [styles.opened]: isReviewOpened,
      [styles.closed]: !isReviewOpened
    })}>
      <ul>
        {product.reviews.map(r => <li key={r._id}><Review review={r}/></li>)}
      </ul>
      <ReviewForm productId={product._id}/>
    </Card>
    </>
	);
};
