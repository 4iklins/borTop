import { menuCategory } from '@/interfaces/page.interface';
import { PageModel } from '@/interfaces/page.interface';
import { ProductsModel } from '@/interfaces/products.interface';

export interface BorPageProps {
  firstCategory: menuCategory,
  page: PageModel,
  products: ProductsModel[]
}