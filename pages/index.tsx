import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { Button } from 'antd';
async function getId() {
  return 1;
}
console.log(getId());
const Home = () => {
  function goToPageTest() {
    Router.push('/test');
  }
  return (
    <div>
      <Link href="/test">
        <div>
          <a>this is a h</a>
          <Button type="primary">Link to Test</Button>
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
