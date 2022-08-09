import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import Carousel from 'react-elastic-carousel';
import Item from './Item';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from 'react-bootstrap/Modal';

import { Link } from 'react-router-dom';

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../../context/auth';
import './style.css';

const breakPoints = [
  { width: 1, itemsToShow: 2 },
  { width: 320, itemsToShow: 2 },
  { width: 550, itemsToShow: 5 },
  { width: 768, itemsToShow: 8 },
  { width: 1200, itemsToShow: 12 },
];

function Group() {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const { loading, data } = useQuery(FETCH_USERS_QUERY);
  const { loading: userLoading, data: userData } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: currentUser,
    },
  });

  const ManageClick = async (userId) => {
    setCurrentUser(userId);

    setShow(true);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    color: '#252525',
    border: '1px solid #C60059',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const currentUserId = user.id;

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <div class="card p-3 py-4">
          <div class="text-center">
            {' '}
            <img
              src={`https://lahokiyqnvcagpcdzvcx.supabase.in/storage/v1/object/public/motorluv-bucket/users/${
                userData ? userData.getUser.profilePicture : ''
              }`}
              width="100"
              class="rounded-circle"
            />{' '}
          </div>
          <div class="text-center mt-3">
            {' '}
            <span class="bg-secondary rounded" style={{ color: '#252525' }}>
              {userData ? userData.getUser.age : ''}
            </span>
            <h5 class="mt-2 mb-0">
              {userData ? userData.getUser.username : ''}
            </h5>{' '}
            <span>{userData ? userData.getUser.city : ''}</span>
            <div class="px-4 mt-1">
              <p class="fonts">{userData ? userData.getUser.bio : ''}</p>
            </div>
            <div class="buttons">
              {' '}
              <Link to="/messenger">
                <button class="btn btn-outline-primary px-4">Messenger</button>{' '}
              </Link>
              <button class="btn btn-primary px-4 ms-3" onClick={handleClose}>
                Close
              </button>{' '}
            </div>
          </div>
        </div>
      </Modal>

      <div className="App">
        <Carousel breakPoints={breakPoints} style={{ width: '60%' }}>
          {loading ? (
            <h1>Loading users..</h1>
          ) : (
            data &&
            data.getUsers
              .filter((u) => u.id !== currentUserId)
              .map((user) => (
                <div
                  class="center aligned author"
                  style={{ color: '#000', cursor: 'pointer' }}
                  post={user}
                  key={user.id}
                  onClick={() => {
                    ManageClick(user.id);
                  }}
                >
                  <img
                    class="ui avatar image"
                    src={`https://lahokiyqnvcagpcdzvcx.supabase.in/storage/v1/object/public/motorluv-bucket/users/${user.profilePicture}`}
                  />{' '}
                  <p className="slider-name"> {user.username}</p>
                </div>
              ))
          )}
        </Carousel>
      </div>
    </>
  );
}

const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      id
      email
      username
      profilePicture
    }
  }
`;
const FETCH_USER_QUERY = gql`
  query ($userId: String!) {
    getUser(userId: $userId) {
      id
      username
      profilePicture
      age
      gender
      city
      car
      car_year
      bio
      email
    }
  }
`;

export default Group;
