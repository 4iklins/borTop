import { ReviewFormProps } from "./ReviewForm.props";
import styles from "./ReviewForm.module.css";
import cn from "classnames";
import { Rating } from "../Rating/Rating";
import { Input } from "../Input/Input";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import CloseIcon from "./close.svg";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm } from "./ReviewForm.interface";

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState } = useForm<IReviewForm>();
	const onSubmit = (data: IReviewForm) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={cn(styles.reviewForm, className)}>
			<Input {...register("name")} className={styles.name} placeholder="Имя" />
			<Input {...register("title")} className={styles.title} placeholder="Заголовок отзыва" />
			<div className={styles.rate}>
				<span>Оценка:</span>
				<Controller
					control={control}
					name="rating"
					render={({ field }) => <Rating rating={field.value} isEditable={true} setRating={field.onChange} />}
				/>
			</div>
			<Textarea {...register("description")} className={styles.text} placeholder="Текст отзыва" />
			<div className={styles.button}>
				<Button color="primary">Отправить</Button>
				<span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
			</div>
			<div className={styles.succes}>
				<div className={styles.succesTitle}>Ваш отзыв отправлен</div>
				<div>Спасибо, ваш отзыв будет опубликован поесле проверки</div>
				<CloseIcon />
			</div>
		</form>
	);
};
