import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Hammer from 'rc-hammerjs';

import UIIcons from '../../pages/components/icons';
import UINotifications from '../../pages/notifications';
import TablesStatic from '../../pages/tables/static';
import MapsGoogle from '../../pages/components/maps/google';
import CoreTypography from '../../pages/typography';
import Charts from '../../pages/components/charts/Charts';
import Dashboard from '../../pages/dashboard';

import Header from '../Header';
import Sidebar from '../Sidebar';
//import BreadcrumbHistory from '../BreadcrumbHistory';
import { openSidebar, closeSidebar } from '../../actions/navigation';
import s from './Layout.module.scss';

function Layout() {
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <Header />
        <Sidebar />
        <Hammer>
          <main className={s.content}>
            <TransitionGroup>
              <CSSTransition classNames="fade" timeout={200}>
                <Switch>
                  <Route
                    path="/app/main"
                    exact
                    render={() => <Redirect to="/app/main/dashboard" />}
                  />
                  <Route
                    path="/app/main/dashboard"
                    exact
                    component={Dashboard}
                  />
                  <Route
                    path="/app/components/icons"
                    exact
                    component={UIIcons}
                  />
                  <Route
                    path="/app/notifications"
                    exact
                    component={UINotifications}
                  />
                  <Route
                    path="/app/components/charts"
                    exact
                    component={Charts}
                  />
                  <Route path="/app/tables" exact component={TablesStatic} />
                  <Route
                    path="/app/components/maps"
                    exact
                    component={MapsGoogle}
                  />
                  <Route
                    path="/app/typography"
                    exact
                    component={CoreTypography}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
            <footer className={s.contentFooter}>
              Light Blue React Template - React admin template made by{' '}
              <a href="https://flatlogic.com">Flatlogic</a>
            </footer>
          </main>
        </Hammer>
      </div>
    </div>
  );
}

export default Layout;
