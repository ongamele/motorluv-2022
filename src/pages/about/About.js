import React, { useState } from 'react';
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import s from './Dashboard.module.scss';
import slayout from '../../components/Layout/Layout.module.scss';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

function About() {
  const [side, setSide] = useState(true);

  return (
    <div className={slayout.root}>
      <div className={slayout.wrap} style={{ marginBottom: '60px' }}>
        <Header changeSide={(side) => setSide(side)} />
        <Sidebar side={side} />
        <div className="breadcrumb">
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem
              style={{
                backgroundColor: '#C20052',
                padding: '6px',
                borderRadius: '8px',
                color: '#fff',
              }}
            >
              ABOUT MOTORLUV
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div
          className={s.root}
          style={{ marginTop: '30px', marginLeft: '10px' }}
        >
          <Row>
            <Col lg={1} md={1}></Col>
            <Col lg={6} md={8} sm={12}>
              <div style={{ color: '#000' }}>
                <p style={{ marginBottom: '24px' }}>
                  Motorluv is a social lifestyle app for car owners, as a
                  community of car owners, you can connect with other people
                  driving same car as you or different cars, develop friendships
                  and relationships, get informations and questions relating to
                  any type of car from our big community of car owners, share
                  beautiful pictures of your car or even of yourself and
                  interact with other users.
                </p>
                <h2>How It Works</h2>
                <p>
                  Car owners come to Motorluv to maintain healthy connections,
                  get answers to any questions relating to cars and even get
                  real time updates of traffics and anything happening in the
                  motor industry. We encourage respect, integrity, kindness and
                  equality among all users.
                </p>
              </div>
            </Col>
            <Col lg={4} md={3}></Col>
          </Row>
        </div>
      </div>

      <footer className="auth-footer">
        {new Date().getFullYear()} &copy; Motorluv{' '}
        <a
          href="https://motorluv.online"
          rel="noopener noreferrer"
          target="_blank"
        >
          Connect
        </a>
        .
      </footer>
    </div>
  );
}

export default About;
