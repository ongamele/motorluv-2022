import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Icon,
  Label,
} from 'semantic-ui-react';

import { Row, Col } from 'reactstrap';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import s from './dashboard/Dashboard.module.scss';
import slayout from '../components/Layout/Layout.module.scss';

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');

  const { data } = useQuery(FETCH_POST_QUERY, {
    pollInterval: 5000,
    variables: {
      postId,
    },
  });

  //alert(JSON.stringify(data));

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;

  if (!data) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
      profilePicture,
      fileName,
    } = data.getPost;

    postMarkup = (
      <div className={slayout.root}>
        <div className={slayout.wrap} style={{ paddingRight: '10px' }}>
          <div className="breadcrumb">
            <Breadcrumb
              tag="nav"
              listTag="div"
              style={{ marginLeft: '-16px', marginBottom: '30px' }}
            >
              <BreadcrumbItem
                style={{
                  backgroundColor: '#C20052',
                  padding: '6px',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              >
                YOU ARE HERE
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className={s.root}>
            <h1 className="page-title">
              &nbsp;
              <small>
                <a href="/">
                  <small style={{ color: '#000' }}>Back</small>
                </a>
              </small>
            </h1>
            <Row>
              <Col lg={2} md={2} sm={2}>
                <Image
                  src={`https://lahokiyqnvcagpcdzvcx.supabase.in/storage/v1/object/public/motorluv-bucket/users/${
                    profilePicture ? profilePicture : ''
                  }`}
                  size="small"
                  float="right"
                />
              </Col>
              <Col lg={8} md={8} sm={10} style={{ marginBottom: 200 }}>
                <Card fluid style={{ border: 'none' }}>
                  <Card.Content
                    className="singlePagePost"
                    style={{ border: 'none' }}
                  >
                    <h6
                      style={{
                        alignSelf: 'left',
                        color: '#252525',
                        fontWeight: 'bold',
                      }}
                    >
                      {username}
                    </h6>
                    <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                    <Image
                      src={`https://lahokiyqnvcagpcdzvcx.supabase.in/storage/v1/object/public/motorluv-bucket/posts/${
                        fileName ? fileName : ''
                      }`}
                      size="large"
                    />
                    <Card.Description>{body}</Card.Description>
                  </Card.Content>
                  <hr />
                  <Card.Content
                    extra
                    style={{ display: 'flex', border: 'none' }}
                  >
                    <LikeButton user={user} post={{ id, likeCount, likes }} />
                    <a
                      class="comments"
                      href={`/posts/${id}`}
                      style={{ color: 'blue', marginLeft: '4px' }}
                    >
                      <i class="comments icon"></i> {commentCount}
                    </a>
                    {user && user.username === username && (
                      <DeleteButton postId={id} callback={deletePostCallback} />
                    )}
                  </Card.Content>
                </Card>
                {user && (
                  <Card fluid>
                    <Card.Content>
                      <p>Post a comment</p>
                      <Form>
                        <div className="ui action input fluid">
                          <input
                            type="text"
                            placeholder="Comment.."
                            name="comment"
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                          />
                          <button
                            type="submit"
                            className="ui button teal"
                            disabled={comment.trim() === ''}
                            onClick={submitComment}
                          >
                            Submit
                          </button>
                        </div>
                      </Form>
                    </Card.Content>
                  </Card>
                )}
                {comments
                  ? comments.map((comment) => (
                      <Card fluid key={comment.id}>
                        <Card.Content>
                          <div style={{ paddingLeft: '95%' }}>
                            {user && user.username === comment.username && (
                              <DeleteButton
                                postId={id}
                                commentId={comment.id}
                              />
                            )}
                          </div>
                          <h6
                            style={{
                              alignSelf: 'left',
                              color: '#252525',
                              fontWeight: 'bold',
                            }}
                          >
                            {comment.username}
                          </h6>
                          <Card.Meta>
                            {moment(comment.createdAt).fromNow()}
                          </Card.Meta>
                          <Card.Description>{comment.body}</Card.Description>
                        </Card.Content>
                      </Card>
                    ))
                  : ''}
              </Col>
              <Col lg={2} md={2} sm={2}></Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      profilePicture
      fileName
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
