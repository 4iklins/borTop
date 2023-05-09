import withLayout from "@/HOC/withLayout";
import axios from 'axios';
import { MenuItem } from "@/interfaces/menu.interface";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { firstLevelMenu } from '@/helpers/helper';
import { menuCategory } from "@/interfaces/page.interface";
import { API } from "@/helpers/api";

const Type = ({ menu, firstCategory }: TypeProps) => {
  return (
    <div>
      {firstCategory && <div>Type: {firstCategory}</div>}
      <ul>
        {menu && menu.map(item => <li key={item._id.secondCategory}>{item._id.secondCategory}</li>)}
      </ul>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: firstLevelMenu.map(menuItem => `/${menuItem.route}`),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    };
  }

  const firstCategory = firstLevelMenu.find(menuItem => menuItem.route == params.type);

  if (!firstCategory) {
    return {
      notFound: true
    };
  }

  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory: firstCategory.id });
    if (menu.length == 0) {
      return {
        notFound: true
      };
    }
    return {
      props: {
        menu,
        firstCategory: firstCategory.id
      }
    };
  } catch {
    return {
      notFound: true
    };
  }

};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: menuCategory
}

export default withLayout(Type);
