import { LayoutProps } from "./Layout.props";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Sidebar } from "./Sidebar/Sidebar";
import styles from "./Layout.module.css";
import cn from "classnames";
import { Up } from "@/components";
import { KeyboardEvent, useRef, useState } from "react";

export const Layout = ({ children, ...props }: LayoutProps): JSX.Element => {
  const [visibleSkip, setVisibleSkip] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);


  const skipOnMouseEnter = () => {
    setVisibleSkip(false);
  };

  const skipKey = (e: KeyboardEvent) => {
    setVisibleSkip(true);
    if (e.code == "Space" || e.code == "Enter") {
      e.preventDefault();
      bodyRef.current?.focus();
    }
    setVisibleSkip(false);
  };
  return (
    <div className={styles.wrapper} {...props}>
      <a className={cn(styles.skip, {
        [styles.skipDisplay]: visibleSkip
      })}
        href="#"
        tabIndex={1}
        onFocus={() => { setVisibleSkip(true); }}
        onKeyDown={(e) => skipKey(e)}
        onMouseEnter={skipOnMouseEnter}
      >Перейти к контенту</a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body} ref={bodyRef} tabIndex={0} role='main'>
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />
    </div>
  );
};