import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import Carousel from 'react-elastic-carousel';
import Item from './Item';

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../../context/auth';

const breakPoints = [
  { width: 1, itemsToShow: 2 },
  { width: 320, itemsToShow: 2 },
  { width: 550, itemsToShow: 5 },
  { width: 768, itemsToShow: 8 },
  { width: 1200, itemsToShow: 12 },
];

function Slider() {
  const { user } = useContext(AuthContext);
  const [receiverId, setReceiverId] = useState(null);

  const senderId = user.id;

  const [SubmitConversation] = useMutation(CREATE_CONVERSATION_MUTATION, {
    variables: {
      senderId: senderId,
      receiverId: receiverId,
    },
  });

  const ManageClick = async (receiverId) => {
    SubmitConversation({
      variables: {
        senderId: senderId,
        receiverId: receiverId,
      },
    });
  };

  const { loading, data } = useQuery(FETCH_USERS_QUERY);
  //console.log(data.data);

  return (
    <>
      <div className="App">
        <Carousel breakPoints={breakPoints}>
          {loading ? (
            <h1>Loading users..</h1>
          ) : (
            data &&
            data.getUsers
              .filter((u) => u.id !== senderId)
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
const CREATE_CONVERSATION_MUTATION = gql`
  mutation createConversation($senderId: String!, $receiverId: String!) {
    createConversation(senderId: $senderId, receiverId: $receiverId) {
      id
      createdAt
      members
    }
  }
`;

export default Slider;
