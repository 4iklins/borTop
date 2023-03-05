import withLayout from "../../HOC/withLayout";
import axios from 'axios';
import { MenuItem } from "../../interfaces/menu.interface";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { PageModel } from '@/interfaces/page.interface';
import { ProductsModel } from '@/interfaces/products.interface';
import { firstLevelMenu } from '@/helpers/helper';
import { menuCategory } from "@/interfaces/page.interface";
import { BorPageComponent } from '@/page-components/BorPage/BorPage.component';

const BorPage = ({ menu, page, products, firstCategory }: BorPageProps) => {

  return (
    <BorPageComponent firstCategory={firstCategory} page={page} products={products} />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];

  for (const firstLevelItem of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory: firstLevelItem.id });
    paths = paths.concat(menu.flatMap(menuItem => menuItem.pages.map(page => `/${firstLevelItem.route}/${page.alias}`)));
  }

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<BorPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
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
  console.log(params);
  try {
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory: firstCategory.id });
    console.log(menu);
    if (menu.length == 0) {
      return {
        notFound: true
      };
    }
    const { data: page } = await axios.get<PageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);
    const { data: products } = await axios.post<ProductsModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', { category: page.category, limit: 10 });
    return {
      props: {
        menu,
        firstCategory: firstCategory.id,
        page,
        products
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

interface BorPageProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: menuCategory,
  page: PageModel,
  products: ProductsModel[]
}

export default withLayout(BorPage);