import { FunctionComponent } from "react";
import { Layout } from "../layout/Layout";

export default function withLayout<T extends Record<string, unknown>>(Component: FunctionComponent<T>) {
  return function withLauoutComponent(props:T):JSX.Element {
    return (
      <Layout>
        <Component {...props}/>
      </Layout>
    );
  };
}