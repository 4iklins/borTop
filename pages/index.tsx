import { Button, Htag, Ptag, Tag, Rating } from "./components";


export default function Home() {
  return (
    <>
      <Htag tag='h1'>Test</Htag>
      <Htag tag='h2'>Test</Htag>
      <Htag tag='h3'>Test</Htag>
      <Button color='primary'>Test</Button>
      <Button color='ghost'>Test</Button>
      <Button color='primary' arrow="down">Test</Button>
      <Button color='ghost' arrow="right">Test</Button>
      <Ptag size='small'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor non iusto odit illo vero magni dolores quidem laudantium totam? Voluptates, nemo nam voluptate numquam magnam dolorum accusantium assumenda debitis sint!</Ptag>
      <Ptag size='medium'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor non iusto odit illo vero magni dolores quidem laudantium totam? Voluptates, nemo nam voluptate numquam magnam dolorum accusantium assumenda debitis sint!</Ptag>
      <Ptag size='large'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor non iusto odit illo vero magni dolores quidem laudantium totam? Voluptates, nemo nam voluptate numquam magnam dolorum accusantium assumenda debitis sint!</Ptag>
      <Tag size='large' color='grey'>gray</Tag>
      <Tag size='large' color='red'>red</Tag>
      <Tag size='small' color='primary' href='https/'>primary</Tag>
      <Tag size='small' color='ghost'>ghost</Tag>
      <Tag size='small' color='green'>green</Tag>
      <Tag>empty</Tag>
      <Rating rating={3} />
    </>
  );
}
