import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Row, Col, Label, FormText, Input, FormGroup } from 'reactstrap';

import { useMutation, gql } from '@apollo/client';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

import { createClient } from '@supabase/supabase-js';

function PostForm() {
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fileNameSelected, setFileNameSelected] = useState(
    'Choose post picture'
  );
  const [file, setFile] = useState('');
  //const { body, onChange, onSubmit } = useForm(createPostCallback);
  const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhaG9raXlxbnZjYWdwY2R6dmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ2MDI5OTEsImV4cCI6MTk2MDE3ODk5MX0.-OBafJvE4CB6IGMNV3qesbrWna2oMoPPhb1Cxqq65Ao';
  const SUPABASE_URL = 'https://lahokiyqnvcagpcdzvcx.supabase.co';

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION);

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
    } else {
      setErrorMessage('Please write your post and upload a valid image');
    }
  };

  const onChange = (event) => {
    setBody(event.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileNameSelected('Post picture selected');
  };

  /*const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
  });*/

  return (
    <>
      {errorMessage ? (
        <h6
          style={{
            color: '#BA3321',
            backgroundColor: '#FEF4F1',
            padding: 8,
            borderRadius: 3,
          }}
        >
          {errorMessage}
        </h6>
      ) : (
        ''
      )}
      <Form className="formContainer">
        <Form.Group style={{ marginBotton: '-16px' }}>
          <Form.TextArea
            placeholder="Your thoughts.."
            name="body"
            type="text"
            onChange={onChange}
            value={body}
            error={error ? true : false}
            className="post-form"
            style={{ minHeight: '40px' }}
          />
        </Form.Group>
        <FormGroup style={{ marginTop: '-16px' }}>
          <Button
            as="label"
            htmlFor="file"
            type="button"
            className="postUploadButton"
            style={{ margin: '2px auto auto 6px', borderRadius: '0px 0px' }}
          >
            <small>{fileNameSelected}</small>
          </Button>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: 'hidden' }}
            hidden
          />
          <Button
            type="button"
            color="#fff"
            onClick={onSubmit}
            style={{
              backgroundColor: '#5EBC4E',
              marginRight: '0px',
              borderRadius: '3px 3px 0px 0px',
            }}
            className="post-image-input"
          >
            <i class="paper plane icon" style={{ color: '#fff' }}></i>
          </Button>
        </FormGroup>
      </Form>
    </>
  );
}
/*const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
    }
  }
`;*/
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

export default PostForm;
