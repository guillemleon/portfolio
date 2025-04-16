import React from 'react';
import './index.scss';
import Layout from '../../components/layout';

function Home() {
  return (
    <Layout>
      <div className="home-container">
        <h1 className="home-title">GUILLEM LEÓN DEV</h1>
        <h2 className="home-subtitle">
          Where <span>UX</span> meets performance
        </h2>
      </div>
    </Layout>
  );
}

export default Home;
