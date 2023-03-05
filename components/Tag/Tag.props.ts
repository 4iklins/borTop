import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  color?: 'primary' | 'ghost' | 'red' | 'gray' | 'green',
  children: ReactNode,
  size?: 'small' | 'large',
  href?: string
}