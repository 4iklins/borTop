import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Review } from '@/interfaces/products.interface';

export interface ReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  review: Review
}