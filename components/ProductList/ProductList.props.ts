import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { PageItem } from '@/interfaces/menu.interface';


export interface ProductListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  pages:PageItem[],
  route: string
}