import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  Row,
  Col,
  Progress,
  Table,
  Label,
  Input,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { useQuery, useMutation, gql } from '@apollo/react-hooks';
import { Button, Form, Grid } from 'semantic-ui-react';
import Modal from 'react-bootstrap/Modal';
import { createClient } from '@supabase/supabase-js';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import { AuthContext } from '../../context/auth';
import PostCard from '../../components/PostCard';
import PostForm from '../../components/PostForm';
import { FETCH_POSTS_QUERY } from '../../util/graphql';

import Widget from '../../components/Widget';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Profile from '../../components/Profile';

import s from './Dashboard.module.scss';
import slayout from '../../components/Layout/Layout.module.scss';
import Group from '../../components/Group/index';
import '../../components/Group/style.css';

function Dashboard() {
  const [body, setBody] = useState('');
  const [side, setSide] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [splash, setSplash] = useState('open-splash');
  const [dashboard, setDashboard] = useState('open-dashboard');
  const [file, setFile] = useState('');
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState();

  const fileInputRef = useRef();

  const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhaG9raXlxbnZjYWdwY2R6dmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ2MDI5OTEsImV4cCI6MTk2MDE3ODk5MX0.-OBafJvE4CB6IGMNV3qesbrWna2oMoPPhb1Cxqq65Ao';
  const SUPABASE_URL = 'https://lahokiyqnvcagpcdzvcx.supabase.co';

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_POSTS_QUERY, { pollInterval: 5000 });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (file != '' && body != '') {
      let arr = file.name.split('.');
      let extension = arr.pop();

      let fileName =
        'post_picture_name_' +
        Math.floor(Math.random() * 10000000000 + 2) +
        '.' +
        extension;
      //console.log(file);
      const { data, error } = await supabase.storage
        .from('motorluv-bucket/posts')
        .upload(fileName, file);
      if (error) {
        console.log(error);
      } else {
        // console.log(data);
      }
      createPost({
        variables: { body, fileName },
        update(proxy, result) {
          const data = proxy.readQuery({
            query: FETCH_POSTS_QUERY,
          });
          data.getPosts = [result.data.createPost, ...data.getPosts];
          proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
          body = '';
        },
      });

      setShow(false);
    } else {
      setErrorMessage('Please write your post and upload a valid image');
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

  const onChange = (event) => {
    setBody(event.target.value);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <div class="card p-3 py-4">
          <div class="text-center">
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
                  alignItems: 'center',
                  fontSize: 18,
                  border: 'none',
                  backgroundColor: '#E90059',
                }}
              >
                <small>Select Picture</small>
              </Button>
            )}
            <input
              type="file"
              id="file"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
            />
            <Form.Group style={{ marginBotton: '-16px' }}>
              <Form.TextArea
                placeholder="Your thoughts.."
                name="body"
                type="text"
                onChange={onChange}
                value={body}
                error={error ? true : false}
                className="post-form"
                style={{
                  minHeight: '40px',
                  borderRadius: 6,
                  width: '80%',
                  padding: 6,
                }}
              />
            </Form.Group>
          </div>

          <div class="text-center">
            <div class="buttons">
              {' '}
              <button class="btn btn-outline-primary px-4" onClick={onSubmit}>
                Submit
              </button>{' '}
              <button class="btn btn-primary px-4 ms-3" onClick={handleClose}>
                Close
              </button>{' '}
            </div>
          </div>
        </div>
      </Modal>

      <div className={slayout.root}>
        <div className={slayout.wrap}>
          <Header changeSide={(side) => setSide(side)} />
          <Sidebar side={side} />
          <div className="breadcrumb">
            <Breadcrumb tag="nav" listTag="div">
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
          <div className={s.root} style={{ marginTop: '34px' }}>
            <h1 className="page-title"></h1>
            {user ? <Group /> : ''}

            <Row>
              <Col lg={6} md={8} sm={12}>
                <Widget className="bg-transparent">
                  {user && (
                    <AddAPhotoIcon
                      fontSize="large"
                      style={{
                        color: '#D80048',
                        marginBottom: 12,
                        cursor: 'pointer',
                      }}
                      onClick={handleShow}
                    />
                  )}
                  {loading ? (
                    <h1>Loading posts..</h1>
                  ) : (
                    data &&
                    data.getPosts.map((post) => (
                      <PostCard post={post} key={post.id} />
                    ))
                  )}
                </Widget>
              </Col>
              <Col lg={1} md={0} sm={12} />

              <Col lg={4} md={2} sm={12}>
                <Profile user={user} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!, $fileName: String!) {
    createPost(body: $body, fileName: $fileName) {
      id
      body
      createdAt
      username
      fileName
      profilePicture
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default Dashboard;
