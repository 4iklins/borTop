import { Htag } from "../components";
import withLayout from "../HOC/withLayout";
import axios from 'axios';
import { MenuItem } from "../interfaces/menu.interface";
import { GetStaticProps } from 'next';
import { API } from "@/helpers/api";
import styles from "./index.module.css";

const Home = ({ menu }: HomeProps):JSX.Element => {
  return (
    <div className={ styles.wrapper }>
      <Htag tag='h1'>Выберите интересующий Вас раздел</Htag>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: number
}

export default withLayout(Home);
