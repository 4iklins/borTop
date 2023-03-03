import withLayout from "../HOC/withLayout";
import axios from 'axios';
import { MenuItem } from "../interfaces/menu.interface";
import { GetStaticProps } from 'next';

const Search = (props: SearchProps) => {
  return (
    <div>Search</div>
  );
};

export const getStaticProps: GetStaticProps<SearchProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface SearchProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: number
}

export default withLayout(Search);
