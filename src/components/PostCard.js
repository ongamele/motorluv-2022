import React, { useContext } from 'react';
import { Button, Card, Icon, Label } from 'semantic-ui-react';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';
import post_image from './post.jpg';
import Widget from './Widget';

function PostCard({
  post: {
    body,
    createdAt,
    fileName,
    id,
    username,
    profilePicture,
    likeCount,
    commentCount,
    likes,
  },
}) {
  const { user } = useContext(AuthContext);

  return (
    <div
      class="ui feed"
      style={{
        borderRadius: '6px',
      }}
    >
      <div class="event">
        <div class="label">
          <img
            src={`https://lahokiyqnvcagpcdzvcx.supabase.in/storage/v1/object/public/motorluv-bucket/users/${profilePicture}`}
          />
        </div>
        <div className="content">
          <div class="summary">
            <a style={{ color: '#14000F' }}>{username}</a>{' '}
            <small style={{ color: '#1D1C16' }}>posted on this group</small>
            <div class="date" style={{ color: '#AD0059' }}>
              {moment(createdAt).fromNow(true)}
            </div>
          </div>
          <div class="extra text" style={{ color: '#26241D' }}>
            <a href={`/posts/${id}`}>
              <Image
                src={`https://lahokiyqnvcagpcdzvcx.supabase.in/storage/v1/object/public/motorluv-bucket/posts/${fileName}`}
                fluid
                style={{ marginBottom: '12px' }}
              />
            </a>
            {body}
          </div>
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <MyPopup content="Comment on post">
            <a
              class="comments"
              href={user ? `/posts/${id}` : '/login'}
              style={{ color: '#BEBEBE', marginLeft: '4px' }}
            >
              <i class="comments icon" styke={{ color: '#525252' }}></i>{' '}
              {commentCount}
            </a>
          </MyPopup>
          {user && user.username === username && <DeleteButton postId={id} />}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
