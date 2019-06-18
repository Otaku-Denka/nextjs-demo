import React from 'react';
import { initStore } from '../redux/store';

declare var window: {
  [key: string]: any;
  prototype: Window;
  new (): Window;
};

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState: any = {}) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default (Comp: any) => {
  class WithReduxApp extends React.Component<any> {
    static async getInitialProps(ctx: any) {
      let reduxStore;

      if (isServer) {
        const { req } = ctx.ctx;
        const session = req.session;

        if (session && session.userInfo) {
          reduxStore = getOrCreateStore({
            user: { data: { ...session.userInfo, ...session.githubAuth } },
          });
        } else {
          reduxStore = getOrCreateStore();
        }
      } else {
        reduxStore = getOrCreateStore();
      }

      ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof Comp.getInitialProps === 'function') {
        appProps = await Comp.getInitialProps(ctx);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }
    reduxStore: any;
    constructor(props: any) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      const { Component, pageProps, ...rest } = this.props;

      return (
        <Comp
          Component={Component}
          pageProps={pageProps}
          {...rest}
          reduxStore={this.reduxStore}
        />
      );
    }
  }

  return WithReduxApp;
};
