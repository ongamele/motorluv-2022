import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Container } from 'reactstrap';
import Widget from '../components/Widget';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      // console.log(result);
      context.login(result.data.login);
      props.history.push('/');
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <>
      <div className="auth-page">
        <Container>
          <Widget
            className="widget-auth mx-auto"
            title={
              <h3 className="mt-0">
                Login to{' '}
                <span style={{ color: '#AE0059', fontWeight: 'bolder' }}>
                  Motorluv
                </span>
              </h3>
            }
          >
            <Form
              onSubmit={onSubmit}
              noValidate
              className={loading ? 'loading' : ''}
            >
              <Form.Input
                className="auth-input"
                label="Username"
                placeholder="Username.."
                name="username"
                error={errors.username ? true : false}
                type="text"
                value={values.username}
                onChange={onChange}
              />
              <Form.Input
                className="auth-input"
                label="Password"
                placeholder="Password.."
                name="password"
                error={errors.password ? true : false}
                type="password"
                value={values.password}
                onChange={onChange}
              />

              <Button
                type="submit"
                style={{ backgroundColor: '#A39E9E', width: '100%' }}
              >
                Login
              </Button>
            </Form>
            <br />
            <center>
              <a href="/register">
                <small style={{ cursor: 'pointer' }}>or Register</small>
              </a>
            </center>
            {Object.keys(errors).length > 0 && (
              <div className="ui error message">
                <ul className="list">
                  {Object.values(errors).map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
          </Widget>
        </Container>
      </div>
      <footer className="auth-footer">
        {new Date().getFullYear()} &copy; Motorluv{' '}
        <a
          href="https://motorluv.online"
          rel="noopener noreferrer"
          target="_blank"
        >
          Connect
        </a>
        .
      </footer>
    </>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      gender
      createdAt
      token
    }
  }
`;

export default Login;
