import { TextareaProps } from "./Textarea.props";
import styles from "./Textarea.module.css";
import cn from "classnames";
import { ForwardedRef, forwardRef } from "react";

export const Textarea = forwardRef(
  ({ className, error, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
      <div className={cn(styles.wrapper, className)}>
        <textarea className={cn(styles.textarea, {
          [styles.error]: error
        })}
          ref={ref}
          {...props}
          aria-label='Текст отзыва'
          aria-invalid={error ? true : false}
        />
        {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
