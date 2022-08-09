import React, { useState } from 'react';
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import s from '../about/Dashboard.module.scss';
import slayout from '../../components/Layout/Layout.module.scss';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

function Contact() {
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
              SUPPORT
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className={s.root} style={{ marginTop: '30px', marginLeft: '5%' }}>
          <Row>
            <Col lg={4} md={4}>
              <h6 style={{ color: '#1C1C1C', fontWeight: 'bold' }}>Email</h6>
              <p style={{ color: '#1C1C1C' }}>support@motorluv.online</p>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <h6 style={{ color: '#1C1C1C', fontWeight: 'bold' }}>Phone</h6>
              <p style={{ color: '#1C1C1C' }}>+27 65 685 3316</p>
            </Col>
            <Col lg={4} md={4}></Col>
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

export default Contact;
