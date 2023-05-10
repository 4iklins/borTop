import { Htag } from "../components";
import withLayout from "../HOC/withLayout";
import styles from "./Error.module.css";

export function Error500():JSX.Element {

  return (
    <div className={styles.wrapper}>
      <Htag tag='h1'>Ошибка 500</Htag>
    </div> 
  );
}

export default withLayout(Error500);