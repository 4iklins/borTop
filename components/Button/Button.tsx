import { ButtonProps } from "./Button.props";
import cn from "classnames";
import styles from "./Button.module.css";
import ArrowIcon from './arrow.svg';

export const Button = ({ color, children, arrow = 'none', className, ...props }: ButtonProps): JSX.Element => {
  return (
    <button className={cn(styles.button, className, {
      [styles.primary]: color == 'primary',
      [styles.ghost]: color == 'ghost'
    })}
      {...props}
    >
      {children}
      {arrow != 'none' && <span className={cn(styles.arrow, {
        [styles.down]: arrow == 'down',
        [styles.right]: arrow == 'right'
      })}
      >
        <ArrowIcon />
      </span>}
    </button>
  );
};