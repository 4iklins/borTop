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
import { API } from "@/helpers/api";
import  Head  from "next/head";
import { Error404 } from "../404";

const BorPage = ({ page, products, firstCategory }: BorPageProps) => {
  if(!page || !products) {
    return <Error404/>;
  }
  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name='description' content={page.metaDescription}/>
        <meta property="og:title" content={page.metaTitle}/>
        <meta property='og:description' content={page.metaDescription}/>
        <meta property='og:type' content='article'/>
      </Head>
      <BorPageComponent firstCategory={firstCategory} page={page} products={products} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];

  for (const firstLevelItem of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory: firstLevelItem.id });
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
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory: firstCategory.id });
    console.log(menu);
    if (menu.length == 0) {
      return {
        notFound: true
      };
    }
    const { data: page } = await axios.get<PageModel>(API.topPage.alias + params.alias);
    const { data: products } = await axios.post<ProductsModel[]>(API.product.find, { category: page.category, limit: 10 });
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