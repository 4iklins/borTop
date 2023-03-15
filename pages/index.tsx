import { useState } from "react";
import { Button, Htag, Ptag, Tag, Rating, Input, Textarea } from "../components";
import withLayout from "../HOC/withLayout";
import axios from 'axios';
import { MenuItem } from "../interfaces/menu.interface";
import { GetStaticProps } from 'next';

const Home = ({ menu }: HomeProps) => {
  const [rating, setRating] = useState<number>(3);
  return (
    <>
      <Htag tag='h1'>Test</Htag>
      <Htag tag='h2'>Test</Htag>
      <Htag tag='h3'>Test</Htag>
      <Button color='primary'>Test</Button>
      <Button color='ghost'>Test</Button>
      <Button color='primary' arrow="down">Test</Button>
      <Button color='ghost' arrow="right">Test</Button>
      <Ptag size='small'>Lorem ipsum dolor sit amet consectetur</Ptag>
      <Ptag size='medium'>Lorem ipsum dolor sit amet consectetur</Ptag>
      <Ptag size='large'>Lorem ipsum dolor sit amet consectetur</Ptag>
      <Tag size='large' color='gray'>gray</Tag>
      <Tag size='large' color='red'>red</Tag>
      <Tag size='small' color='primary' href='https/'>primary</Tag>
      <Tag size='small' color='ghost'>ghost</Tag>
      <Tag size='small' color='green'>green</Tag>
      <Tag>empty</Tag>
      <Rating rating={rating} isEditable={true} setRating={setRating} />
      <Input placeholder="Поиск..."/>
      <Textarea placeholder="текст"/>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', { firstCategory });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: number
}

export default withLayout(Home);
