import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: 'primary' | 'ghost' | 'red' | 'grey' | 'green',
  children: ReactNode,
  size?: 'small' | 'large',
  href?: string
}