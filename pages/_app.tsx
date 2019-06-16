import * as React from 'react';
import App, { Container } from 'next/app';
import Layout from '../components/layout/layout';
// import withRedux, { NextJSAppContext } from 'next-redux-wrapper';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import { NextComponentType, NextContext } from 'next';

const isServer = typeof window === 'undefined';
interface AppProps {
  Component: NextComponentType;
  ctx: NextContext;
  reduxStore: any;
  pageProps?: any;
}

export default withReduxStore(
  class MyApp extends App<AppProps> {
    async getInitialProps({ Component, ctx }: AppProps) {
      if (isServer) {
        console.log('server');
      }
      return {
        test: 'yeseaeasad',
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {},
        ctx: ctx ? ctx : null,
      };
    }
    render() {
      const { Component, pageProps, reduxStore } = this.props;
      return (
        <Container>
          <Provider store={reduxStore}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </Container>
      );
    }
  },
);
