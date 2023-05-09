import styles from "./Up.module.css";
import { motion, useAnimation } from 'framer-motion';
import { useScrollY } from "@/hooks/useScrollY";
import { useEffect } from "react";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";


export const Up = (): JSX.Element => {
  const currentScrollY = useScrollY();
  const controls = useAnimation();
  useEffect(() => {
    controls.start({ opacity: currentScrollY / document.body.scrollHeight, zIndex: currentScrollY == 0 ? -1 : 2 });
  }, [currentScrollY, controls]);

  const handleUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div className={styles.up}
      animate={controls}
      initial={{ opacity: 0, zIndex: -1 }}
    >
      <ButtonIcon color='primary' icon='up' onClick={handleUp} />
    </motion.div>
  );
};