import React, { useState, useContext } from 'react';
import cx from 'classnames';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import s from './Sidebar.module.scss';
import LinksGroup from './LinksGroup';
import { AuthContext } from '../../context/auth';

import { changeActiveSidebarItem } from '../../actions/navigation';
import { logoutUser } from '../../actions/user';
import HomeIcon from '../Icons/SidebarIcons/HomeIcon';
import TypographyIcon from '../Icons/SidebarIcons/TypographyIcon';
import TablesIcon from '../Icons/SidebarIcons/TablesIcon';
import NotificationsIcon from '../Icons/SidebarIcons/NotificationsIcon';
import ComponentsIcon from '../Icons/SidebarIcons/ComponentsIcon';
import PowerIcon from '../Icons/HeaderIcons/PowerIcon';
import BellIcon from '../Icons/HeaderIcons/BellIcon';
import MessageIcon from '../Icons/HeaderIcons/MessageIcon';
import logo from './logo.png';

function Sidebar({ side }) {
  const { user, logout } = useContext(AuthContext);
  var SideVal = '';
  if (side) {
    SideVal = s.root;
  } else {
    SideVal = s.rootb;
  }
  var receiver = '';
  {
    user ? (receiver = user.id) : (receiver = '');
  }
  const { loading, data } = useQuery(
    FETCH_UNREAD_MESSAGES_QUERY,

    {
      pollInterval: 5000,
      variables: {
        receiver: receiver,
      },
    }
  );

  //console.log(data);

  var d = null;

  {
    loading ? (d = 0) : (d = data.getUnreadMessages.length);
  }

  const Bar = user ? (
    <nav className={cx(SideVal)}>
      <header className={s.logo}>
        <a href="https://motorluv.online">
          <img src={require('./logo.png')} className="logo" />
        </a>
      </header>
      <ul className={s.nav}>
        <LinksGroup
          header="Home"
          isHeader
          iconName={<HomeIcon className={s.menuIcon} />}
          link="/"
          index="main"
        />
        <h5 className={[s.navTitle, s.groupTitle].join(' ')}>MENU</h5>

        <LinksGroup
          header="Groups"
          isHeader
          iconName={<TypographyIcon className={s.menuIcon} />}
          link="/brands"
          index="core"
        />
        <LinksGroup
          header="Messenger"
          isHeader
          iconName={<MessageIcon className={s.menuIcon} />}
          link="/messenger"
          index="tables"
        />
        <LinksGroup
          header={`Notifications(${d})`}
          isHeader
          iconName={<BellIcon className={s.menuIcon} />}
          link="/messenger"
          index="ui"
        />
        <a href="#" onClick={logout}>
          <LinksGroup
            header="Logout"
            isHeader
            iconName={<PowerIcon className={s.menuIcon} />}
            index="components"
          />
        </a>
      </ul>
      <h5 className={s.navTitle}>
        MORE
        {/* eslint-disable-next-line */}
      </h5>
      {/* eslint-disable */}
      <ul className={s.sidebarLabels}>
        <li>
          <a href="#">
            <i className="fa fa-circle text-success mr-2" />
            <span className={s.labelName}>Policy</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-circle text-primary mr-2" />
            <span className={s.labelName}>About</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-circle text-danger mr-2" />
            <span className={s.labelName}>Contact Motorluv</span>
          </a>
        </li>
      </ul>
    </nav>
  ) : (
    <nav className={cx(SideVal)}>
      <header className={s.logo}>
        <a href="https://motorluv.online">
          <img src={logo} className="logo" />
        </a>
      </header>
      <ul className={s.nav}>
        <LinksGroup
          header="Home"
          isHeader
          iconName={<HomeIcon className={s.menuIcon} />}
          link="/"
          index="main"
        />
        <h5 className={[s.navTitle, s.groupTitle].join(' ')}>MENU</h5>

        <LinksGroup
          header="Groups"
          isHeader
          iconName={<TypographyIcon className={s.menuIcon} />}
          link="/brands"
          index="core"
        />
        <LinksGroup
          header="Messenger"
          isHeader
          iconName={<MessageIcon className={s.menuIcon} />}
          link="/login"
          index="tables"
        />
        <LinksGroup
          header="Notifications"
          isHeader
          iconName={<BellIcon className={s.menuIcon} />}
          link="/login"
          index="ui"
        />
        <LinksGroup
          header="Login"
          isHeader
          iconName={<ComponentsIcon className={s.menuIcon} />}
          link="/login"
          index="components"
        />
        <LinksGroup
          header="Register"
          isHeader
          iconName={<NotificationsIcon className={s.menuIcon} />}
          link="/register"
          index="ui"
        />
      </ul>
      <h5 className={s.navTitle}>
        MORE
        {/* eslint-disable-next-line */}
      </h5>
      {/* eslint-disable */}
      <ul className={s.sidebarLabels}>
        <li>
          <a href="/policy">
            <i className="fa fa-circle text-success mr-2" />
            <span className={s.labelName}>Policy</span>
          </a>
        </li>
        <li>
          <a href="/about">
            <i className="fa fa-circle text-primary mr-2" />
            <span className={s.labelName}>About</span>
          </a>
        </li>
        <li>
          <a href="/contact">
            <i className="fa fa-circle text-danger mr-2" />
            <span className={s.labelName}>Contact Motorluv</span>
          </a>
        </li>
      </ul>
    </nav>
  );

  return Bar;
}

const FETCH_UNREAD_MESSAGES_QUERY = gql`
  query ($receiver: String!) {
    getUnreadMessages(receiver: $receiver) {
      id
      sender
      receiver
      body
      status
      createdAt
    }
  }
`;

export default Sidebar;
