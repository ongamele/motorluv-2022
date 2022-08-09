import React from 'react';
import moment from 'moment';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

function Message({ message, own, userId }) {
  const { loading, data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId,
    },
  });

  return (
    <div className={own ? 'message own' : 'message'}>
      <div className="messageTop">
        {loading ? (
          <p>Loading profile picture...</p>
        ) : (
          <img
            className="messageImg"
            src={`https://lahokiyqnvcagpcdzvcx.supabase.in/storage/v1/object/public/motorluv-bucket/users/${data.getUser.profilePicture}`}
            alt=""
          />
        )}
        <p className="messageText">{message.body}</p>
      </div>
      <div className="messageBottom">
        {moment(message.createdAt).fromNow(true)}
      </div>
    </div>
  );
}

const FETCH_USER_QUERY = gql`
  query ($userId: String!) {
    getUser(userId: $userId) {
      id
      username
      profilePicture
      email
    }
  }
`;

export default Message;
