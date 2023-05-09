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

export const ReviewForm = ({ productId, className, isOpen, ...props }: ReviewFormProps): JSX.Element => {
  const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>();
  const [isSucces, setIsSucces] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>();
  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId });
      if (data.message) {
        setIsSucces(true);
        reset();
      } else {
        setIsError('Что-то пошло не так');
      }
    } catch (e: any) {
      setIsError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.reviewForm, className)} {...props}>
      <Input {...register("name", { required: { value: true, message: "Заполните Имя" } })}
        error={errors.name}
        className={styles.name}
        placeholder="Имя"
        tabIndex={isOpen ? 0 : -1}
      />
      <Input {...register("title", { required: { value: true, message: "Заполните Заголовок" } })}
        error={errors.title}
        className={styles.title}
        placeholder="Заголовок отзыва"
        tabIndex={isOpen ? 0 : -1}
      />
      <div className={styles.rate}>
        <span>Оценка:</span>
        <Controller
          control={control}
          rules={{ required: { value: true, message: "Поставьте оценку" } }}
          name="rating"
          render={({ field }) => (
            <Rating ref={field.ref}
              rating={field.value}
              isEditable={true}
              setRating={field.onChange}
              error={errors.rating}
              tabIndex={isOpen ? 0 : -1}
            />
          )}
        />
      </div>
      <Textarea {...register("description", { required: { value: true, message: "Заполните Описание" } })}
        error={errors.description}
        className={styles.text}
        placeholder="Текст отзыва"
        tabIndex={isOpen ? 0 : -1}
      />
      <div className={styles.button}>
        <Button color="primary" tabIndex={isOpen ? 0 : -1} onClick={() => clearErrors()}>Отправить</Button>
        <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку.</span>
      </div>
      {isSucces && <div role='alert' className={cn(styles.succes, styles.popup)}>
        <div className={styles.succesTitle}>Ваш отзыв отправлен.</div>
        <div>Спасибо, ваш отзыв будет опубликован поесле проверки.</div>
        <button onClick={() => { setIsSucces(false); }}
          aria-label='Закрыть оповещение'
        >
          <CloseIcon />
        </button>
      </div>}
      {isError && <div role='alert' className={cn(styles.error, styles.popup)}>
        <div>Что-то пошло не так, обновите страницу.</div>
        <button onClick={() => { setIsError(undefined); }}
          aria-label='Закрыть оповещение'
        >
          <CloseIcon />
        </button>
      </div>}
    </form>
  );
};
