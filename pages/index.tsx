import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { Button } from 'antd';

const Home = () => {
  function goToPageTest() {
    Router.push('/test');
  }
  return (
    <div>
      <Link href="/test">
        <div>
          <a>this is a anch</a>
          <Button>Link to Test</Button>
        </div>
      </Link>
      <div>
        <Button onClick={goToPageTest}>this is on click</Button>
      </div>
      <Button>Antd Buttonasdads</Button>
    </div>
  );
};

export default Home;
