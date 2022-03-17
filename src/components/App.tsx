import { Layout } from 'antd';
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from './Navigation';
import Routes from "./Routes";
import StoreProvider from "./Store";

export default function App(): ReactElement {
  const { Header, Content } = Layout;

  return (
    <StoreProvider>
      <BrowserRouter>
        <Layout>
          <Header><Navigation /></Header>
          <Content><Routes /></Content>
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  );
}