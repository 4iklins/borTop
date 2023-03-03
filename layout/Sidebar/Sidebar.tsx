import { SidebarProps } from "./Sidebar.props";
import styles from "./Sidebar.module.css";
import cn from "classnames";
import { Menu } from '../Menu/Menu';
import Logo from '../logo.svg';

export const Sidebar = ({ ...props }: SidebarProps): JSX.Element => {
  return (
  
    <div {...props}>
      <Logo/>
      <Menu />
    </div>
  );
};