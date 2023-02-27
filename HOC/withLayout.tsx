import { AppContextProvider, IAppContext } from '@/context/app.context';
import { FunctionComponent } from "react";
import { Layout } from "../layout/Layout";

export default function withLayout<T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) {
  return function withLauoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory} setMenu={props.setMenu}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>

    );
  };
}