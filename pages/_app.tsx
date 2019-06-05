import * as React from 'react';
import App, { Container } from 'next/app';
import Layout from '../components/layout/container';

class MyApp extends App {
  render() {
    const { Component } = this.props;
    return (
      <Container>
        <Layout>
          <Component />
        </Layout>
      </Container>
    );
  }
}

export default MyApp;
