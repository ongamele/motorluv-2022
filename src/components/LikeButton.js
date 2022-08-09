import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';
import MyPopup from '../util/MyPopup';

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <a class="like" style={{ color: '#27B092' }}>
        <i class="like icon"></i> {likeCount}
      </a>
    ) : (
      <a class="like" style={{ color: '#A1EFB5' }}>
        <i class="like icon"></i> {likeCount}
      </a>
    )
  ) : (
    <a
      class="like="
      href={`/login`}
      href
      as={Link}
      to="/login"
      style={{ color: 'teal' }}
    >
      <i class="like icon"></i> {likeCount}
    </a>
  );

  return (
    <>
      <div class="meta" onClick={likePost}>
        <MyPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</MyPopup>
      </div>
    </>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
