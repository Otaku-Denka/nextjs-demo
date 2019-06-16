import * as React from 'react';
import App, { Container } from 'next/app';
import Layout from '../components/layout/layout';
// import withRedux, { NextJSAppContext } from 'next-redux-wrapper';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import { NextComponentType, NextContext } from 'next';

interface AppProps {
  Component: NextComponentType;
  ctx: NextContext;
  reduxStore: any;
  pageProps?: any;
}

class MyApp extends App<AppProps> {
  static async getInitialProps(ctx: any) {
    const { Component } = ctx;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps,
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
}
export default withReduxStore(MyApp);
