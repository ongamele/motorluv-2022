import React, { useState } from 'react';
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import s from './Dashboard.module.scss';
import slayout from '../../components/Layout/Layout.module.scss';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

function Policy() {
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
              MOTORLUV POLICY OVERVIEW
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
                  Motorluv (“We” or “Us”) is the owner of www.Motorluv.online
                  (“Website”) and the Motorluv mobile applications
                  (“Applications”), which may be added or removed from time to
                  time. We are committed to your privacy. This online Privacy
                  Policy discloses our practices for the Website, Applications
                  and the services (“Services”) which we provide to you through
                  them. The contents of this Policy include the type of
                  information we collect, the methods by which we collect such
                  information, what we use the information for and who we share
                  it with.
                </p>
                <p style={{ fontWeight: 'bold' }}>
                  This policy is effective on the 1st of December 2021 and will
                  apply to all visitors, users and others who access the
                  Services. We reserve the right to change this Policy from time
                  to time as necessary and when we do, you will be able to find
                  the updated version at this web address. We are obligated to
                  notify you of such changes in advance either by an email or by
                  a notice on the Website. Please check regularly to see if we
                  have updated the Policy. Your continued use of the Website and
                  Applications will signify your acceptance of any amendment to
                  these terms.
                </p>
                <h3>Eligibility</h3>
                <p>
                  The Applications and website are intended solely for persons
                  who are eighteen (18) years of age or older and any
                  registration by use of or access to the Services by any person
                  under 18 is unauthorized and in violation of this Policy.
                </p>
                <h3>Information</h3>
                <p>
                  We encourage our users not to post or disclose sensitive
                  information about yourself that can be easily compromised such
                  as your driver’s license or National Identity numbers which
                  might be open to abuse or misuse. When you post information
                  about yourself or anything you tell users in the messaging
                  feature, you doing that fully at your own risk.
                </p>

                <h3>Consent</h3>
                <p>
                  By using the Applications and/or providing your information,
                  you consent to the collection and use of the information you
                  disclose while using the Services, in accordance with this
                  Policy, including but not limited to your consent for sharing
                  your information as per this Policy. If you do not agree to
                  give consent to the use of your personal information as
                  described in this Policy, please do not use or access the
                  Website or Applications.
                </p>
                <h3>What we do with our personal information</h3>
                <p>
                  The purpose of our collecting your personal information is to
                  give you an efficient, enjoyable and secure User experience.
                  We may use your information to:
                </p>
                <ol>
                  <li>
                    {' '}
                    Provide the Services and support that you have requested for
                  </li>
                  <li> Troubleshoot problems</li>
                  <li> Contact you with information about our app or site</li>
                  <li> Personalize the content we deliver to you</li>
                  <li>
                    {' '}
                    Conduct analytics and sometimes research on how you use the
                    app or site
                  </li>
                  <li> Protect our users or any third parties from harm.</li>
                  <li>
                    {' '}
                    Detect, prevent or remediate fraud or violations of this
                    Policy or any applicable user agreements
                  </li>
                  <li>
                    {' '}
                    Enable you to take part in promotions or competitions
                  </li>
                  <li>
                    {' '}
                    Recommending products or services which we believe would be
                    of interest to you
                  </li>
                  <li>
                    {' '}
                    Improve our Services by implementing aggregate customer
                    preferences
                  </li>
                  <li>
                    {' '}
                    Measure performance of Services and improve content,
                    technology and layout
                  </li>
                  <li>
                    {' '}
                    Complying with applicable laws and regulations, such as by
                    verifying your identity
                  </li>
                  <li>
                    {' '}
                    Poll your opinions through surveys or questionnaires.
                  </li>
                </ol>

                <h3>Your Information & Your Rights</h3>
                <p>
                  You may exercise the following data protection rights: the
                  right of deletion, the right to amend or rectify your personal
                  data, the right to object to the use of your personal data,
                  the right to restrict processing of your data, the right to
                  review your data, and the right to request for your data to be
                  provided to you or transferred. If we hold any information
                  about you which is incorrect or if there are any changes to
                  your details, please let Us know so that we can keep our
                  records accurate and up to date.
                </p>
                <p>
                  We will retain your personal information for the duration of
                  our Services to you and afterwards for as long as is necessary
                  and relevant for our purposes as permitted by applicable laws
                  and regulations. Where we no longer need your personal
                  information, we will dispose of it in a secure manner without
                  further notice to you
                </p>

                <h3>Security</h3>
                <p>
                  We will employ all commercially reasonable efforts to keep
                  your information secure by taking appropriate technical and
                  organizational measures against its unauthorized or unlawful
                  processing and against its accidental loss, destruction or
                  damage. Sadly, no internet or website and app is 100 percent
                  secure and we cannot guarantee that hacking, data loss or
                  other breaches may not happen. Some tips to help keep your
                  data and account secure.
                </p>
                <ul>
                  <li>• Always log out your account after use</li>
                  <li>
                    • Don’t share your account password or log in details to
                    anyone
                  </li>
                  <li>• Always change your password from time to time.</li>
                </ul>

                <h3>Transfers and Legal Disclosures</h3>
                <p>
                  It is possible that we will need to disclose information about
                  you when required by law, subpoena, or other legal process or
                  if we have a good faith belief that disclosure is reasonably
                  necessary to
                </p>
                <ol>
                  <li>
                    1. investigate, prevent or take action regarding suspected
                    or actual illegal activities or to assist government
                    enforcement agencies
                  </li>
                  <li>2. Enforce our agreements with you</li>
                  <li>
                    3. Investigate and defend ourselves against any third-party
                    claims or allegations
                  </li>
                  <li>
                    4. Protect the security or integrity of our Services (such
                    as by sharing with companies facing similar threats)
                  </li>
                  <li>
                    5. Exercise or protect the rights and safety of motorluv,
                    our Users, personnel or others. We attempt to notify Users
                    about legal demands for their personal data when appropriate
                    in our judgment, unless prohibited by law or court order or
                    when the request is an emergency.
                  </li>
                </ol>
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

export default Policy;
