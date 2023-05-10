import { Htag } from "../components";
import withLayout from "../HOC/withLayout";
import styles from "./Error.module.css";

export function Error404():JSX.Element {

  return (
    <div className={styles.wrapper}>
      <Htag tag='h1'>Ошибка 404</Htag>
    </div> 
  );
}

export default withLayout(Error404);