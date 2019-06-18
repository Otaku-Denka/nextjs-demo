import * as React from 'react';
import App, { Container } from 'next/app';
import Layout from '../components/layout/layout';
// import withRedux, { NextJSAppContext } from 'next-redux-wrapper';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import { NextComponentType, NextContext } from 'next';
import Router from 'next/router';
import PageLoading from '../components/common/pageLoading';

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
  state = {
    loading: false,
  };
  startLoading() {
    this.setState({
      loading: true,
    });
  }
  stopLoading() {
    this.setState({
      loading: false,
    });
  }
  componentDidMount() {
    Router.events.on('routeChangeStart', this.startLoading.bind(this));
    Router.events.on('routeChangeComplete', this.stopLoading.bind(this));
    Router.events.on('routeChangeError', this.stopLoading.bind(this));
  }
  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.startLoading.bind(this));
    Router.events.off('routeChangeComplete', this.stopLoading.bind(this));
    Router.events.off('routeChangeError', this.stopLoading.bind(this));
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          {this.state.loading ? <PageLoading /> : null}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}
export default withReduxStore(MyApp);
