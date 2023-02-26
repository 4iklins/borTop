import withLayout from "../../HOC/withLayout";
import axios from 'axios';
import { MenuItem } from "../../interfaces/menu.interface";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { PageModel } from '@/interfaces/page.interface';
import { ProductsModel } from '@/interfaces/products.interface';

const firstCategory = 0;

const Course = ({ menu, page, products }: CourseProps) => {

	return (
		<>
			<ul>
				{menu.map(item => <li key={item._id.secondCategory}>{item._id.secondCategory}</li>)}
			</ul>
			<ul>
				{products.map(m => <li key={m._id}>{m.title}</li>)}
			</ul>

		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory });
	return {
		paths: menu.flatMap(menuItem => menuItem.pages.map(page => '/courses/' + page.alias)),
		fallback: true
	};
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true
		};
	}
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory });
	const { data: page } = await axios.get<PageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);
	const { data: products } = await axios.post<ProductsModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', { category: page.category, limit: 10 });
	return {
		props: {
			menu,
			firstCategory,
			page,
			products
		}
	};
};

interface CourseProps extends Record<string, unknown> {
	menu: MenuItem[],
	firstCategory: number,
	page: PageModel,
	products: ProductsModel[]
}

export default withLayout(Course);