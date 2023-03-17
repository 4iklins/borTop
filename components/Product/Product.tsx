import { ProductProps } from "./Product.props";
import styles from "./Product.module.css";
import cn from "classnames";
import { Button, Card, Htag, Rating, Tag } from "@/components";
import {priceRu} from '@/helpers/helper';

export const Product = ({product, className}: ProductProps): JSX.Element => {

	return (
		<Card className={cn(styles.product, className)}>
			<div className={styles.image}><img src={process.env.NEXT_PUBLIC_DOMAIN + product.image}></img></div>
      <Htag tag="h3" className={styles.title}>{product.title}</Htag>
      <div className={styles.price}>
        {priceRu(product.price)}
        {product.oldPrice && <Tag color="green">{priceRu(product.price - product.oldPrice)}</Tag>}
      </div>
      <div className={styles.credit}>{priceRu(product.credit)}<span>/мес</span></div>
      <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating}/></div>
      <div className={styles.categories}>{product.categories.map(c => <Tag color="ghost">{c}</Tag>)}</div>
      <div className={styles.priceTitle}>цена</div>
      <div className={styles.creditTitle}>в кредит</div>
      <div className={styles.review}>{product.reviewCount} отзывов</div>
      <hr color="#EBEBEB"/>
      <div className={styles.description}>{product.description}</div>

      <div className={styles.characteristicsBlock}>
        <ul className={styles.characteristics}>
          {product.characteristics.map(c => <li key={c.name}>
            <span>{c.name}</span>
            <span className={styles.dot}></span>
            <span>{c.value}</span>
          </li>)}
        </ul>
        <div className={styles.tags}>{product.tags.map(t => <Tag color="ghost">{t}</Tag>)}</div>
      </div>

      <div className={styles.advantagesBlock}>
        <div className={styles.advantages}>
          <div>Преимущества</div>
          <div>{product.advantages}</div>
        </div>
        <div className={styles.disadvantages}>
          <div>Недостатки</div>
          <div>{product.disadvantages}</div>
        </div>
      </div>
      <hr color="#EBEBEB"/>
      <div className={styles.actions}>
        <Button color="primary">Узнать подробнее</Button>
        <Button color="ghost" arrow="right">Читать отзывы</Button>
      </div>
		</Card> 
	);
};
