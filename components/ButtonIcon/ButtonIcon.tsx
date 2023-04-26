import { ButtonIconProps } from "./ButtonIcon.props";
import cn from "classnames";
import styles from "./ButtonIcon.module.css";
import { icons } from "./ButtonIcon.props";

export const ButtonIcon = ({ color, icon, className, ...props }: ButtonIconProps): JSX.Element => {
  const IconComponent = icons[icon];
  return (
    <button className={cn(styles.button, className, {
      [styles.primary]: color == 'primary',
      [styles.white]: color == 'white'
    })}
      {...props}
    >
      <IconComponent/>
    </button>
  );
};