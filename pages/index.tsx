import React from 'react';
import { NextFunctionComponent, NextContext } from 'next';
const isServer = typeof window === 'undefined';
const Home: NextFunctionComponent<any> = () => {
  return <div>this is home page</div>;
};

Home.getInitialProps = async (props: NextContext) => {
  return {};
};

export default Home;
