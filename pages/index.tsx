import { Button, Htag } from "./components";

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
    </>
  );
}
