import React, { useContext, useRef, useEffect, useState } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  UncontrolledAlert,
  Dropdown,
  Collapse,
  DropdownToggle,
  Badge,
} from 'reactstrap';
import PowerIcon from '../Icons/HeaderIcons/PowerIcon';
import BellIcon from '../Icons/HeaderIcons/BellIcon';
import BurgerIcon from '../Icons/HeaderIcons/BurgerIcon';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, Form, Grid } from 'semantic-ui-react';
import { createClient } from '@supabase/supabase-js';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

import s from './Header.module.scss';
import 'animate.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #C60059',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function Header({ changeSide }) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Change Profile Picture');
  const [Message, setMessage] = useState('');
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();
  const { user, logout } = useContext(AuthContext);
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

  const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhaG9raXlxbnZjYWdwY2R6dmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ2MDI5OTEsImV4cCI6MTk2MDE3ODk5MX0.-OBafJvE4CB6IGMNV3qesbrWna2oMoPPhb1Cxqq65Ao';
  const SUPABASE_URL = 'https://lahokiyqnvcagpcdzvcx.supabase.co';

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  //console.log(data);

  var d = null;

  {
    loading ? (d = 0) : (d = data.getUnreadMessages.length);
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleChecked = () => setChecked((value) => !value);
  changeSide(checked);

  const [
    updateProfilePicture,
    { data: updateProfilePictureStatus, loading: updateProfilePictureLoading },
  ] = useMutation(UPDATE_PROFILE_PICTURE);

  const donePictureUpload = async (event) => {
    event.preventDefault();
    console.log(user);
    if (file != '') {
      let arr = file.name.split('.');
      let extension = arr.pop();

      let profilePicture =
        'profile_picture_name_' +
        Math.floor(Math.random() * 10000000000 + 2) +
        '.' +
        extension;

      const { data, error } = await supabase.storage
        .from('motorluv-bucket/users')
        .upload(profilePicture, file);
      if (error) {
        console.log(error);
      } else {
        // console.log(data);
      }

      updateProfilePicture({
        variables: {
          userId: user.id,
          profilePicture,
        },
      });
      setOpen(false);
    } else {
      setMessage('Select a valid picture.');
    }
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  const menuBar = user ? (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {preview ? (
            <img
              src={preview}
              style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                curser: 'pointer',
                alignItems: 'center',
                marginRight: 4,
              }}
            />
          ) : (
            <Button
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
              }}
              type="button"
              style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                curser: 'pointer',
                display: 'flex',
                alignItems: 'center',
                fontSize: 18,
                border: 'none',
                backgroundColor: '#E90059',
              }}
            >
              <small>{fileName}</small>
            </Button>
          )}
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setFileName('Picture Selected');
            }}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          <Button type="button" warning onClick={donePictureUpload}>
            Save
          </Button>
        </Box>
      </Modal>

      <Navbar className={`d-print-none`}>
        <div className={s.burger}>
          <NavLink
            className={`d-md-none ${s.navItem} text-white`}
            href="#"
            onClick={toggleChecked}
          >
            <BurgerIcon className={s.headerIcon} />
          </NavLink>
        </div>
        <div className={`d-print-none ${s.root}`}>
          <UncontrolledAlert
            className={`${s.alert} mr-3 d-lg-down-none animate__animated animate__bounceIn animate__delay-1s`}
          >
            {'   '}
            Hello{' '}
            <button className="btn-link">
              <SettingsIcon className={s.settingsIcon} />
            </button>{' '}
            motor lover!
          </UncontrolledAlert>
          <Collapse className={`${s.searchCollapse} ml-lg-0 mr-md-3`}>
            <InputGroup></InputGroup>
          </Collapse>
          <Form className="d-md-down-none mr-3 ml-3" inline></Form>

          <Nav className="ml-md-0">
            <Dropdown
              nav
              id="basic-nav-dropdown"
              className={`${s.notificationsMenu}`}
            >
              <DropdownToggle
                nav
                caret
                style={{ color: '#C1C3CF', padding: 0 }}
              >
                <span
                  className={`${s.avatar} rounded-circle thumb-sm float-left`}
                >
                  {user.profilePicture ? (
                    <img
                      src={`https://lahokiyqnvcagpcdzvcx.supabase.in/storage/v1/object/public/motorluv-bucket/users/${user.profilePicture}`}
                      alt="..."
                      onClick={handleOpen}
                    />
                  ) : (
                    ''
                  )}
                </span>
                <span className={`small d-sm-down-none ${s.accountCheck}`}>
                  {user.username}
                </span>
                <Badge className={`d-sm-down-none ${s.badge}`} color="success">
                  {d}
                </Badge>
              </DropdownToggle>
            </Dropdown>

            <NavItem className={`${s.divider} d-none d-sm-block`} />

            <Dropdown className="d-sm-block" nav>
              <DropdownToggle nav className={`${s.navItem} text-white`}>
                <Link to="/edit">
                  <SettingsIcon color="#CB0059" style={{ color: '#CB0059' }} />
                </Link>
              </DropdownToggle>
            </Dropdown>
            <NavItem>
              <NavLink
                className={`${s.navItem} text-white`}
                href="#"
                onClick={logout}
              >
                <PowerIcon className={s.headerIcon} />
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    </>
  ) : (
    <Navbar className={`d-print-none `}>
      <div className={s.burger}>
        <NavLink
          className={`d-md-none ${s.navItem} text-white`}
          href="#"
          onClick={toggleChecked}
        >
          <BurgerIcon className={s.headerIcon} />
        </NavLink>
      </div>
      <div className={`d-print-none ${s.root}`}>
        <UncontrolledAlert
          className={`${s.alert} mr-3 d-lg-down-none animate__animated animate__bounceIn animate__delay-1s`}
        >
          {'   '}
          Hello{' '}
          <button className="btn-link">
            <SettingsIcon className={s.settingsIcon} />
          </button>{' '}
          motor lover!
        </UncontrolledAlert>
        <Collapse className={`${s.searchCollapse} ml-lg-0 mr-md-3`}></Collapse>
        <Form className="d-md-down-none mr-3 ml-3" inline></Form>

        <Nav className="ml-md-0">
          <NavItem className={`${s.divider} d-none d-sm-block`} />

          <NavItem>
            <NavLink className={`${s.navItem} text-white`} href="/login">
              <PowerIcon className={s.headerIcon} />
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  );

  return menuBar;
}

const UPDATE_PROFILE_PICTURE = gql`
  mutation updateProfilePicture($userId: ID!, $profilePicture: String!) {
    updateProfilePicture(userId: $userId, profilePicture: $profilePicture) {
      id
      profilePicture
    }
  }
`;

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

export default Header;
