import { ReviewFormProps } from "./ReviewForm.props";
import styles from "./ReviewForm.module.css";
import cn from "classnames";
import { Rating } from "../Rating/Rating";
import { Input } from "../Input/Input";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import CloseIcon from "./close.svg";
import { useForm, Controller } from "react-hook-form";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import axios from "axios";
import { API } from "@/helpers/api";
import { useState } from "react";

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit, formState:{errors}, reset } = useForm<IReviewForm>();
  const [isSucces, setIsSucces] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>();
	const onSubmit = async (formData: IReviewForm) => {
    try{
      const {data} = await axios.post<IReviewSentResponse >(API.review.createDemo,{...formData, productId});
      if(data.message){
        setIsSucces(true);
        reset();
      } else {
        setIsError('Что-то пошло не так');
      }
    } catch(e:any){
      setIsError(e.message);
    }
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={cn(styles.reviewForm, className)}>
			<Input {...register("name", {required:{value:true, message:"Заполните Имя"}})}
      error={errors.name}
      className={styles.name}
      placeholder="Имя"
      />
			<Input {...register("title", {required:{value:true, message:"Заполните Заголовок"}})}
      error={errors.title}
      className={styles.title}
      placeholder="Заголовок отзыва"
      />
			<div className={styles.rate}>
				<span>Оценка:</span>
				<Controller
					control={control}
          rules={{required:{value:true, message:"Поставьте оценку"}}}
					name="rating"
					render={({ field }) => (
						<Rating ref={field.ref}
            rating={field.value}
            isEditable={true}
            setRating={field.onChange}
            error={errors.rating}
            />
					)}
				/>
			</div>
			<Textarea {...register("description",{required:{value:true, message:"Заполните Описание"}})}
      error={errors.description}
      className={styles.text}
      placeholder="Текст отзыва"
      />
			<div className={styles.button}>
				<Button color="primary">Отправить</Button>
				<span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку.</span>
			</div>
      {isSucces && <div className={cn(styles.succes, styles.popup)}>
				<div className={styles.succesTitle}>Ваш отзыв отправлен.</div>
				<div>Спасибо, ваш отзыв будет опубликован поесле проверки.</div>
				<CloseIcon onClick={()=>{setIsSucces(false);}}/>
			</div>}
      {isError && <div className={cn(styles.error, styles.popup)}>
				<div>Что-то пошло не так, обновите страницу.</div>
				<CloseIcon onClick={()=>{setIsError(undefined);}}/>
			</div>}
		</form>
	);
};
