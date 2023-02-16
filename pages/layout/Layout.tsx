import { LayoutProps } from "./Layout.props";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Sidebar } from "./Sidebar/Sidebar";
import styles from "./Ptag.module.css";
import cn from "classnames";

export const Layout = ({children, ...props }: LayoutProps): JSX.Element => {
  return (
    <div {...props}>
      <Header/>
      <Sidebar/>
      {children}
      <Footer/>
    </div>
  );
};