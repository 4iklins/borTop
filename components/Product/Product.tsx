import { ProductProps } from "./Product.props";
import styles from "./Product.module.css";
import cn from "classnames";
import { Button, Card, Htag, Ptag, Rating, Tag, Review, ReviewForm } from "@/components";
import { declOfNum, priceRu } from '@/helpers/helper';
import Image from "next/image";
import { ForwardedRef, MouseEvent, forwardRef, useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';
import { useAnimation } from "framer-motion";
import { useScrollY } from "@/hooks/useScrollY";

export const Product = motion(forwardRef(({ product, className }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const currentScrollY = useScrollY();

  useEffect(() => {

    if (isReviewOpened) {
      const scroll = async () => {
        if (currentScrollY == 0) {
          window.scrollTo({ top: 1 });
        }
        await controls.start({ height: 'auto' });
        reviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      scroll();
    } else {
      controls.start({ height: 0 });
    }
  }, [isReviewOpened, controls]);

  const toggleReview = () => {
    setIsReviewOpened(!isReviewOpened);
  };

  const scrollToReview = (e: MouseEvent) => {
    e.preventDefault();
    setIsReviewOpened(true);
    reviewRef.current?.focus({ preventScroll: true });
  };

  return (
    <div ref={ref} className={className}>
      <Card className={styles.product}>
        <div className={styles.image}>
          <Image src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <Htag tag="h3" className={styles.title}>{product.title}</Htag>
        <div className={styles.price}>
          <span className='visualyHidden'>Цена</span>
          {priceRu(product.price)}
          {product.oldPrice && <Tag className={styles.oldPrice} color="green"><span className='visualyHidden'>Скидка</span>{priceRu(product.price - product.oldPrice)}</Tag>}
        </div>
        <div className={styles.credit}><span className='visualyHidden'>Кредит</span>{priceRu(product.credit)}<span>/мес</span></div>
        <div className={styles.rating}>
          <span className='visualyHidden'>{`Рейтинг ${product.reviewAvg ?? product.initialRating}`}</span>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.categories}>{product.categories.map(c => <Tag key={c} className={styles.category} color="ghost">{c}</Tag>)}</div>
        <div className={styles.priceTitle} aria-hidden={true}>цена</div>
        <div className={styles.creditTitle} aria-hidden={true}>в кредит</div>
        <div className={styles.review}>
          <a href="#ref"
            onClick={scrollToReview}
          >{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a></div>
        <hr className={cn(styles.hr, styles.hr1)} color="#EBEBEB" />
        <Ptag className={styles.description} size="medium">{product.description}</Ptag>

        <div className={styles.characteristicsBlock}>
          <ul className={styles.characteristics}>
            {product.characteristics.map(c => <li key={c.name}>
              <span className={styles.characteristicName}>{c.name}</span>
              <span className={styles.dot}></span>
              <span className={styles.characteristicValue}>{c.value}</span>
            </li>)}
          </ul>
          <div className={styles.tags}>{product.tags.map(t => <Tag key={t} className={styles.tag} color="ghost">{t}</Tag>)}</div>
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
        <hr className={cn(styles.hr, styles.hr2)} color="#EBEBEB" />
        <div className={styles.actions}>
          <Button color="primary">Узнать подробнее</Button>
          <Button color="ghost"
            arrow={isReviewOpened ? "down" : "right"}
            onClick={toggleReview}
            aria-expanded={isReviewOpened}
          >Читать отзывы</Button>
        </div>
      </Card>
      <motion.div
        className={styles.reviewWrapper}
        initial={{ height: 0 }}
        animate={controls}
        layout
      >
        <Card color="blue" ref={reviewRef} className={cn(styles.reviews)} tabIndex={isReviewOpened ? 0 : -1}>
          <ul>
            {product.reviews.map(r => <li key={r._id}><Review review={r} /></li>)}
          </ul>
          <ReviewForm productId={product._id} isOpen={isReviewOpened} />
        </Card>
      </motion.div>

    </div>
  );
}));
