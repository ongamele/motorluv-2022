import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Row, Col } from 'reactstrap';

function Conversation({ conversation, Id }) {
  // console.log(conversation.members);

  const userId = conversation.members.find((m) => m !== Id);
  // alert(friendId);
  const { loading, data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId,
    },
  });

  return (
    <Row>
      <Col lg={2} md={2}></Col>
      <Col lg={8} md={2} sm={12}>
        <div className="conversation">
          {loading ? (
            <h1>Loading friends..</h1>
          ) : (
            <img
              className="conversationImg"
              src={`https://lahokiyqnvcagpcdzvcx.supabase.in/storage/v1/object/public/motorluv-bucket/users/${
                data ? data.getUser.profilePicture : ''
              }`}
              alt=""
            />
          )}

          {loading ? (
            <h1>Loading friends..</h1>
          ) : (
            <span className="conversationName">
              {data ? data.getUser.username : ''}
            </span>
          )}
        </div>
      </Col>

      <Col lg={2} md={2}></Col>
    </Row>
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

export default Conversation;
