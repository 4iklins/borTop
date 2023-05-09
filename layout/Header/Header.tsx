import { HeaderProps } from "./Header.props";
import Logo from "@/layout/logo.svg";
import { ButtonIcon } from "@/components";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from "./Header.module.css";
import cn from "classnames";
import { motion } from 'framer-motion';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router]);

  const variants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20
      }
    },
    close: {
      opacity: 0,
      x: '100%'
    }
  };

  return (
    <header className={cn(styles.header, className)} {...props}>
      <Logo />
      {!isMenuOpen && <ButtonIcon className={styles.menuOpen} icon="menu" color="white" onClick={() => { setIsMenuOpen(true); }} />}
      {isMenuOpen && <ButtonIcon className={styles.menuClose} icon="close" color="white" onClick={() => { setIsMenuOpen(false); }} />}
      <motion.div className={styles.menu}
        layout
        initial="close"
        variants={variants}
        animate={isMenuOpen ? 'open' : 'close'}
      >
        <Sidebar />
      </motion.div>
    </header>
  );
};