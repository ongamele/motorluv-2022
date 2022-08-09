import React, { useContext, useState } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Row, Col, Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import { AuthContext } from '../../context/auth';
import { useForm } from '../../util/hooks';
import { createClient } from '@supabase/supabase-js';

import Widget from '../../components/Widget';
import s from '../dashboard/Dashboard.module.scss';
import slayout from '../../components/Layout/Layout.module.scss';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

function Register(props) {
  const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhaG9raXlxbnZjYWdwY2R6dmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ2MDI5OTEsImV4cCI6MTk2MDE3ODk5MX0.-OBafJvE4CB6IGMNV3qesbrWna2oMoPPhb1Cxqq65Ao';
  const SUPABASE_URL = 'https://lahokiyqnvcagpcdzvcx.supabase.co';

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ];

  const [side, setSide] = useState(true);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [car, setCar] = useState('');
  const [car_year, setCaryear] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Profile Picture');
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  /*const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.register);
      props.history.push('/');
    },
    onError(err) {
      // alert(err.graphQLErrors[0].extensions.errors);
      console.log(JSON.stringify(err));
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      username,
      age,
      gender,
      city,
      car,
      car_year,
      bio,
      email,
      password,
      confirmPassword,
      profilePicture,
    },
  });*/

  const [addUser, { loading }] = useMutation(REGISTER_USER);

  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleCar = (e) => {
    setCar(e.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (
      username != '' &&
      age != '' &&
      gender != '' &&
      city != '' &&
      car != '' &&
      car_year != '' &&
      bio != '' &&
      email != '' &&
      password != '' &&
      confirmPassword != '' &&
      file != ''
    ) {
      let arr = file.name.split('.');
      let extension = arr.pop();

      let profilePicture =
        'profile_picture_name_' +
        Math.floor(Math.random() * 10000000000 + 2) +
        '.' +
        extension;

      const { data, error } = await supabase.storage
        .from('motorluv-bucket/users')
        .upload(profilePicture, file);
      if (error) {
        console.log(error);
      } else {
        // console.log(data);
      }

      addUser({
        update(_, result) {
          context.login(result.data.register);
          props.history.push('/');
        },
        onError(err) {
          // alert(err.graphQLErrors[0].extensions.errors);
          console.log(JSON.stringify(err));
          setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: {
          username,
          age,
          gender,
          city,
          car,
          car_year,
          bio,
          email,
          password,
          confirmPassword,
          profilePicture,
        },
      });
    } else {
      setErrorMessage(
        'Please fill in all fields and upload a valid profile picture.'
      );
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
              SIGN UP
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className={s.root}>
          <Widget className="bg-transparent">
            <Form noValidate className={loading ? 'loading' : ''}>
              <br />
              <Container>
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
                    <Form.Input
                      className="auth-input"
                      label="Age"
                      placeholder="Age.."
                      name="age"
                      error={errors.age ? true : false}
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
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
                      <option value="">Choose</option>
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
                    <label
                      style={{
                        color: '#000',
                        fontSize: 13,
                        fontWeight: 'bold',
                        marginBottom: -2,
                      }}
                    >
                      Car
                    </label>

                    <select
                      className="auth-input"
                      onChange={handleCar}
                      error={errors.car ? true : false}
                      style={{ marginBottom: 6 }}
                    >
                      <option value=""></option>
                      <option value="alfa_romeo">Alfa Romeo</option>
                      <option value="aston_martin">Aston Martin</option>
                      <option value="audi">Audi</option>
                      <option value="bentley">Bentley</option>
                      <option value="bmw">BMW</option>
                      <option value="chevrolet">Chevrolet</option>
                      <option value="fiat">Fiat</option>
                      <option value="ford">Ford</option>
                      <option value="mazda">Mazda</option>
                      <option value="mercedes_benz">Mercedes Benz</option>
                      <option value="Subaru">Subaru</option>
                      <option value="suzukin">Suzuki</option>
                      <option value="toyota">Toyota</option>
                      <option value="nissan">Nissan</option>
                      <option value="gwm">GWM</option>
                      <option value="vw">VW</option>
                      <option value="honda">Honda</option>
                      <option value="jeep">Jeep</option>
                      <option value="volvo">Volvo</option>
                      <option value="land_rover">Land Rover</option>
                      <option value="Hyundai">hyundai</option>
                      <option value="mahindra">Mahindra</option>
                      <option value="isuzu">Isuzu</option>
                      <option value="dodge">Dodge</option>
                      <option value="ferrari">Ferrari</option>
                      <option value="lexus">Lexus</option>
                      <option value="lamboghini">Lamboghini</option>
                      <option value="renault">Renault</option>
                      <option value="kia">Kia</option>
                      <option value="mitsubishi">Mitsubishi</option>
                      <option value="mini_cooper">Mini Cooper</option>
                      <option value="porsche">Porsche</option>
                      <option value="peugeot">Peugeot</option>
                      <option value="datsun">Datsun</option>
                      <option value="jaguar">Jaguar</option>
                      <option value="chrysler">Chrysler</option>
                      <option value="rolls_royce">Rolls Royce</option>
                      <option value="infiniti">Infiniti</option>
                      <option value="cadillac">Cadillac</option>
                    </select>
                    <Form.Input
                      className="auth-input"
                      label="Car Year"
                      placeholder="Car Year.."
                      name="car_year"
                      error={errors.car_year ? true : false}
                      type="number"
                      value={car_year}
                      onChange={(e) => setCaryear(e.target.value)}
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
                    <Form.Input
                      className="auth-input"
                      label="Password"
                      placeholder="Password.."
                      name="password"
                      error={errors.password ? true : false}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Input
                      className="auth-input"
                      label="Confirm Password"
                      placeholder="Confirm Password.."
                      name="confirmPassword"
                      error={errors.confirmPassword ? true : false}
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                      as="label"
                      htmlFor="file"
                      type="button"
                      style={{ marginTop: '24px' }}
                    >
                      <small>{fileName}</small>
                    </Button>
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: 'hidden' }}
                      hidden
                    />

                    <Button type="submit" primary onClick={onSubmit}>
                      Register
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $age: String!
    $gender: String!
    $city: String!
    $car: String!
    $car_year: String!
    $bio: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $profilePicture: String!
  ) {
    register(
      registerInput: {
        username: $username
        age: $age
        gender: $gender
        city: $city
        car: $car
        car_year: $car_year
        bio: $bio
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        profilePicture: $profilePicture
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

export default Register;
