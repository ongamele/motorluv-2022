import React, { useContext, useState } from 'react';
import {
  Row,
  Col,
  Progress,
  Table,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import { AuthContext } from '../../context/auth';
import PostCard from '../../components/PostCard';
import PostForm from '../../components/PostForm';
import { FETCH_POSTS_QUERY } from '../../util/graphql';

import Widget from '../../components/Widget';

import Calendar from './components/calendar/Calendar';
import Map from './components/am4chartMap/am4chartMap';
import Rickshaw from './components/rickshaw/Rickshaw';

import AnimateNumber from 'react-animated-number';

import s from './Dashboard.module.scss';
import slayout from '../../components/Layout/Layout.module.scss';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

import peopleA1 from '../../assets/people/a1.jpg';
import peopleA2 from '../../assets/people/a2.jpg';
import peopleA5 from '../../assets/people/a5.jpg';
import peopleA4 from '../../assets/people/a4.jpg';

const alfa_romeo =
  'https://www.nicepng.com/png/full/74-745813_alfa-romeo-logo-png-pic-alfa-romeo-stelvio.png';
const aston_martin =
  'https://car-brand-names.com/wp-content/uploads/2019/10/aston-martin-logo-500x281.png';
const audi = 'https://www.carlogos.org/logo/Audi-logo-2009-1920x1080.png';
const bentley =
  'https://www.nicepng.com/png/full/58-584087_bentley-symbol-hd-png-bentley-logo-png.png';
const bmw = 'https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png';
const fiat = 'https://www.carlogos.org/logo/Fiat-logo-2006-1920x1080.png';
const ford = 'https://1000logos.net/wp-content/uploads/2018/02/Ford-Logo.png';

const mazda =
  'https://logos-world.net/wp-content/uploads/2020/05/Mazda-Logo-700x394.png';
const mercedes =
  'https://www.car-brand-names.com/wp-content/uploads/2015/05/Mercedes-Benz-logo.png';
const subaru =
  'https://www.car-brand-names.com/wp-content/uploads/2015/08/Subaru-logo.png';
const suzuki =
  'https://motosymbol.com/wp-content/uploads/2021/02/Suzuki-Logo-500x375.png';
const toyota =
  'https://logos-world.net/wp-content/uploads/2020/04/Toyota-Logo-700x394.png';

const nissan =
  'https://www.logolynx.com/images/logolynx/77/77b6810a1d39a9e7cf70312af292afff.png';
const gwm =
  'https://seeklogo.com/images/G/gwm-group-logo-BD9F40480D-seeklogo.com.png';
const vw =
  'https://logos-world.net/wp-content/uploads/2021/04/Volkswagen-Logo.png';
const honda = 'https://1000logos.net/wp-content/uploads/2018/03/Honda-logo.png';
const volvo = 'https://www.carlogos.org/logo/Volvo-logo-2014-1920x1080.png';
const jeep = 'https://logos-world.net/wp-content/uploads/2021/09/Jeep-Logo.png';
const land_rover =
  'https://www.carlogos.org/logo/Land-Rover-logo-2011-1920x1080.png';
const hyundai =
  'https://www.carlogos.org/logo/Hyundai-logo-silver-2560x1440.png';
const chevrolet =
  'https://www.car-brand-names.com/wp-content/uploads/2015/08/Chevrolet-logo.png';
const mahindra =
  'https://listcarbrands.com/wp-content/uploads/2017/11/Mahindra-logo.png';
const maserati =
  'https://www.car-brand-names.com/wp-content/uploads/2015/05/Maserati-logo.png';

const citreon =
  'https://logos-world.net/wp-content/uploads/2021/08/Citroen-Logo.png';
const isuzu = 'https://1000logos.net/wp-content/uploads/2021/04/Isuzu-logo.png';
const dodge =
  'https://car-brand-names.com/wp-content/uploads/2015/09/Dodge-logo-500x146.png';
const ferrari =
  'https://listcarbrands.com/wp-content/uploads/2015/12/logo-Ferrari-600x310.png';
const lexus = 'https://www.carlogos.org/logo/Lexus-symbol-1988-640x287.jpg';
const lamboghini =
  'https://www.carlogos.org/car-logos/lamborghini-logo-1000x1100.png';
const renault = 'https://www.carlogos.org/logo/Renault-logo-2015-2048x2048.png';
const kia = 'https://www.carlogos.org/logo/Kia-logo-2560x1440.png';
const mitsubishi =
  'https://www.carlogos.org/logo/Mitsubishi-logo-2000x2500.png';
const miniCooper = 'https://www.carlogos.org/logo/Mini-logo-2001-640x270.jpg';
const porsche =
  'https://www.carlogos.org/car-logos/porsche-logo-2100x1100-show.png';
const peugeot =
  'https://www.carlogos.org/car-logos/porsche-logo-2100x1100-show.png';
const datsun = 'https://www.carlogos.org/logo/Datsun-logo-1935-3840x2160.png';
const jaguar = 'https://www.carlogos.org/logo/Jaguar-logo-2012-1920x1080.png';
const chrysler =
  'https://www.carlogos.org/logo/Chrysler-logo-1998-1920x1080.png';
const rollsRoyce =
  'https://www.carlogos.org/logo/Rolls-Royce-logo-2048x2048.png';
const infiniti =
  'https://www.carlogos.org/logo/Infiniti-logo-1989-2560x1440.png';
const cadillac =
  'https://www.carlogos.org/logo/Cadillac-logo-2014-1920x1080.png';

function Brands() {
  const { user } = useContext(AuthContext);

  const [side, setSide] = useState(true);

  const { loading, data } = useQuery(FETCH_POSTS_QUERY, { pollInterval: 5000 });

  return (
    <div className={slayout.root}>
      <div className={slayout.wrap}>
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
              MOTOR GROUPS
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div
          className={s.root}
          style={{ marginTop: '30px', marginLeft: '16px' }}
        >
          <Row>
            <Col lg={12} md={12} sm={12} style={{ padding: 20 }}>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={alfa_romeo}
                  alt=""
                  height="50"
                  as={Link}
                  to={'/'}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={aston_martin}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={bentley}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={audi}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={bmw}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={fiat}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                {' '}
                <img
                  className="img-rounded brand-logo"
                  src={ford}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                {' '}
                <img
                  className="img-rounded brand-logo"
                  src={mazda}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                {' '}
                <img
                  className="img-rounded brand-logo"
                  src={mercedes}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                {' '}
                <img
                  className="img-rounded brand-logo"
                  src={subaru}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                {' '}
                <img
                  className="img-rounded brand-logo"
                  src={suzuki}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={toyota}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={nissan}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={gwm}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={vw}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                {' '}
                <img
                  className="img-rounded brand-logo"
                  src={honda}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={volvo}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={jeep}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={land_rover}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={hyundai}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={chevrolet}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                {' '}
                <img
                  className="img-rounded brand-logo"
                  src={mahindra}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={maserati}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                {' '}
                <img
                  className="img-rounded brand-logo"
                  src={peugeot}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={citreon}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                {' '}
                <img
                  className="img-rounded brand-logo"
                  src={isuzu}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={dodge}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={ferrari}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={lexus}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={lamboghini}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={renault}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={miniCooper}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={datsun}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={jaguar}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={chrysler}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={rollsRoyce}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={infiniti}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={kia}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={mitsubishi}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={porsche}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
              <Link to={'/'}>
                <img
                  className="img-rounded brand-logo"
                  src={cadillac}
                  alt=""
                  height="50"
                  as={Link}
                  to={`/`}
                />
              </Link>
            </Col>
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

export default Brands;
