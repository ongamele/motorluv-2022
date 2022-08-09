import React, { useContext, useState } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';

import { Row, Col, Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import { AuthContext } from '../../context/auth';
import { useForm } from '../../util/hooks';

import Widget from '../../components/Widget/Widget';
import s from '../dashboard/Dashboard.module.scss';
import slayout from '../../components/Layout/Layout.module.scss';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';

function EditProfile(props) {
  const [updateUser, { data: updateData, loading }] = useMutation(UPDATE_USER);
  const { user } = useContext(AuthContext);
  const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ];

  const { loading: userDataLoading, data: userData } = useQuery(
    FETCH_USER_QUERY,
    {
      variables: {
        userId: user.id,
      },
    }
  );

  console.log(user);

  const [side, setSide] = useState(true);
  const [username, setUsername] = useState(user.username);
  const [gender, setGender] = useState(user.gender);
  const [city, setCity] = useState(user.city);
  const [bio, setBio] = useState(user.bio);
  const [email, setEmail] = useState(user.email);

  const [errors, setErrors] = useState({});
  const [Message, setMessage] = useState('');

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const onSubmit = async () => {
    if (
      username != '' &&
      gender != '' &&
      city != '' &&
      bio != '' &&
      email != ''
    ) {
      updateUser({
        variables: {
          id: user.id,
          username,
          gender,
          city,
          bio,
          email,
        },
      });

      window.location.href = '/';
    } else {
      setMessage('Fill in all fields.');
    }
  };

  return (
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
              EDIT PROFILE
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className={s.root}>
          <Widget className="bg-transparent">
            <Form noValidate className={updateData ? 'loading' : ''}>
              <br />
              <Container>
                {Message ? (
                  <h6
                    style={{
                      color: '#BA3321',
                      backgroundColor: '#FEF4F1',
                      padding: 8,
                      borderRadius: 3,
                    }}
                  >
                    {Message}
                  </h6>
                ) : (
                  ''
                )}

                <Row>
                  <Col lg={3} md={3} sm={12}></Col>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Input
                      className="auth-input"
                      label="Username"
                      placeholder="Username.."
                      name="username"
                      error={errors.username ? true : false}
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label
                      style={{
                        color: '#000',
                        fontSize: 13,
                        fontWeight: 'bold',
                        marginBottom: -2,
                      }}
                    >
                      Gender
                    </label>

                    <select
                      className="auth-input"
                      onChange={handleGender}
                      error={errors.gender ? true : false}
                      style={{ marginBottom: 6 }}
                    >
                      <option value={gender}>{gender}</option>
                      <option value="Male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <Form.Input
                      className="auth-input"
                      label="City"
                      placeholder="City.."
                      name="city"
                      error={errors.city ? true : false}
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />

                    <Form.TextArea
                      className="auth-input"
                      label="Bio"
                      placeholder="Bio.."
                      name="bio"
                      error={errors.bio ? true : false}
                      type="text"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      style={{ minHeight: 114 }}
                    />
                    <Form.Input
                      className="auth-input"
                      label="Email"
                      placeholder="Email.."
                      name="email"
                      error={errors.email ? true : false}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                      type="button"
                      warning
                      style={{ marginBottom: '10%' }}
                      onClick={onSubmit}
                    >
                      Save Changes
                    </Button>
                  </Col>
                  <Col lg={3} md={3} sm={12}></Col>
                </Row>
              </Container>
            </Form>
          </Widget>
          {Object.keys(errors).length > 0 && (
            <div className="ui error message">
              <ul className="list">
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
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
    </div>
  );
}

const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $username: String!
    $gender: String!
    $city: String!
    $bio: String!
    $email: String!
  ) {
    updateUser(
      updateUserInput: {
        id: $id
        username: $username
        gender: $gender
        city: $city
        bio: $bio
        email: $email
      }
    ) {
      id
      email
      username
      age
      gender
      city
      car
      car_year
      bio
      createdAt
      profilePicture
      token
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

export default EditProfile;
