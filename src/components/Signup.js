/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import {
  Col, Row, Form, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Screen, Basics } from 'styles';
import { ReactComponent as Loader } from './svg/loader.svg';
import { postSignUp } from '../redux/action/auth';
import Alert from './alert';

const Wrapper = styled.div`
display: content
p{
  font-weight: 500
}
${Screen.tablet`
p{
margin-bottom: 100px
}
`}
${Screen.screen425`
height: auto
`}
`;
const Header = styled.h1`
font-family: ${Basics.fonts.PeaceSans};
color: #F44C49
${Screen.largePhone`
font-size: 35px
`}
`;
const FormCon = styled.div`
display: flex
justify-content: flex-end
width: 100%
form{
  display: flex;
  flex-flow: column nowrap
  width: 70%
}
input{
  margin-bottom: 30px
  border: 1px solid #5555
  padding: 10px 30px
  border-radius: 15px
  outline: none
}
input::placeholder{
  color: #5555
}
.btn{
  width: 40%
  border-radius: 15px
  outline: none
}
${Screen.screen993`
justify-content: center
`}
${Screen.largePhone`
margin-bottom: 50px
form{
  width: 100%
}
`}
`;

const ButtonContainer = styled.div`
display: flex
width: 100%
justify-content: center;
align-items: center
`;

const Signup = ({ postSignUp, auth: { isAuthenticated, loader } }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    loading: false,
  });

  const {
    firstName, lastName, email, password, loading,
  } = formData;

  useEffect(() => {
    if (!loader) {
      setFormData({ ...formData, loading: false });
    }
    // eslint-disable-next-line
  }, [loader]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, loading: true });
    // return console.log(formData);
    await postSignUp({
      firstName, lastName, email, password,
    });
    setFormData({ ...formData, loading: false });
  };
  if (isAuthenticated) {
    setTimeout(() => {
      return <Redirect to='/profile' />;
    }, 3000);
  }

  return (
    <Wrapper >
      <Row>
        <Col lg={true}>
          <Header>WELCOME TO BREWERY CO.</Header>
          <p>This is where we produce the best of the best drinks to turn your day up and make it a fun filled day.</p>
        </Col>
        <Col lg={true}>
          <FormCon>
            <Form onSubmit={(e) => onSubmit(e)} >
            <Alert />
              <input type="text" placeholder='first name' name='firstName' required onChange={(e) => onChange(e)} value={firstName} />
              <input type="text" placeholder='last name' name='lastName' required onChange={(e) => onChange(e)} value={lastName} />
              <input type="email" placeholder='email' name='email' required onChange={(e) => onChange(e)} value={email} />
              <input type="password" placeholder='password' name='password' required onChange={(e) => onChange(e)} value={password} />
              <ButtonContainer >
                <Button variant="outline-danger" type='submit' >{loading ? <Loader /> : 'Signup'}</Button>
              </ButtonContainer>
            </Form>
          </FormCon>
        </Col>
      </Row>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  auth: state.Auth,
});

export default connect(mapStateToProps, { postSignUp })(Signup);
