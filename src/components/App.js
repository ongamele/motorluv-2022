import React, { useContext } from 'react';
import { Switch, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

/* eslint-disable */
import ErrorPage from '../pages/error';
/* eslint-enable */

import Hammer from 'rc-hammerjs';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import '../App.css';

import { AuthProvider, AuthContext } from '../context/auth';
import AuthRoute from '../util/AuthRoute';

import '../styles/theme.scss';
import Dashboard from '../pages/dashboard';
import Brands from '../pages/brands/Brands';
import Policy from '../pages/policy/Policy';
import About from '../pages/about/About';
import Contact from '../pages/contact/Contact';
import Messenger from '../pages/messenger/Messenger';
import Login from '../pages/Login';
import Register from '../pages/register/Register';
import EditProfile from '../pages/editProfile/EditProfile';
import SinglePost from '../pages/SinglePost';

import { logoutUser } from '../actions/user';

const CloseButton = ({ closeToast }) => (
  <i onClick={closeToast} className="la la-close notifications-close" />
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <>
          <ToastContainer
            autoClose={5000}
            hideProgressBar
            closeButton={<CloseButton />}
          />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/brands" component={Brands} />
          <Route exact path="/policy" component={Policy} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/messenger" component={Messenger} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/edit" component={EditProfile} />
        </>
      </Router>
    </AuthProvider>
  );
}

export default App;
