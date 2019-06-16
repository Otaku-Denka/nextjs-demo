import React from 'react';
import { NextFunctionComponent, NextContext } from 'next';

const Home: NextFunctionComponent<any> = () => {
  return <div>this is home page</div>;
};

Home.getInitialProps = async (props: NextContext) => {
  console.log('home');
  return {};
};

export default Home;
