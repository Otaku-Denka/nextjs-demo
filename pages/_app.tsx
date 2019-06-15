import * as React from 'react';
import App, { Container } from 'next/app';
import Layout from '../components/layout/layout';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { initStore } from '../redux/store';
import { NextComponentType, NextContext } from 'next';

interface AppProps {
  Component: NextComponentType;
  ctx: NextContext;
  store: any;
}

export default withRedux(initStore)(
  class MyApp extends App<AppProps> {
    async getInitialProps({ Component, ctx }: AppProps) {
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {},
      };
    }
    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Container>
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </Container>
      );
    }
  },
);
