import { TagProps } from "./Tag.props";
import cn from "classnames";
import styles from "./Tag.module.css";

export const Tag = ({ color = 'ghost', children, size = 'small', href, className, ...props }: TagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.small]: size == 'small',
        [styles.large]: size == 'large',
        [styles.primary]: color == 'primary',
        [styles.ghost]: color == 'ghost',
        [styles.red]: color == 'red',
        [styles.grey]: color == 'grey',
        [styles.green]: color == 'green',
      })}
      {...props}
    >
      {href ? <a className={styles.href} href={href}>{children}</a> : children}
    </div>
  );
};