import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ProductsModel } from '@/interfaces/products.interface';

export interface ProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product:ProductsModel
}