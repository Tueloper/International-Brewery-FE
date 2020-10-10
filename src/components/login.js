/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import {
  Col, Row, Form, Button,
} from 'react-bootstrap';
import styled from 'styled-components';
import { Screen, Basics } from 'styles';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { ReactComponent as Loader } from './svg/loader.svg';
// import Shapes from '../images/login.png';
import { postLogIn } from '../redux/action/auth';
import Alert from './alert';

const Wrapper = styled.div`
display: content
p{
  font-weight: 500
}
img{
  max-width: 100%;
   height: auto;
}
${Screen.pc`
// height: 81vh
`}
${Screen.tablet`
img{
  // width: 70%
}
.row{
  flex-direction: column-reverse
}
p{
margin-bottom: 100px
}
`}
${Screen.miniTablet`
height: auto
p{
margin-bottom: 100px
}
// overflow: auto
`}
${Screen.screen425`
height: auto
`}
`;
const Title = styled.h1`
font-family: ${Basics.fonts.PeaceSans};
color: #F44C49
text-align: center;
margin-bottom: 50px;
${Screen.tablet`
margin-top: 50px;
margin-bottom: 20px;
`}
${Screen.largePhone`
font-size: 35px
`}
`;
// const Header = styled.div`
// width: 100%
// ${Screen.tablet`
// text-align: center
// `}
// ${Screen.largePhone`
// // display: none
// `}
// `;

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
${Screen.tablet`
margin-top: 100px
`}
${Screen.largePhone`
margin-bottom: 20px
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

const Login = ({ postLogIn, history, auth: { isAuthenticated } }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    loading2: false,
  });

  const {
    email, password, loading2,
  } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, loading2: true });
    await postLogIn(email, password, history);
    setFormData({ ...formData, loading2: false });
  };

  if (isAuthenticated) {
    return <Redirect to='/profile' />;
  }

  return (
    <Wrapper >
      <Row>
        <Col lg={true}>
          <Title>Brewery CO.</Title>
        </Col>
        <Col lg={true}>
          <FormCon>
            <Form onSubmit={(e) => onSubmit(e)} >
              <Alert />
              <input type="email" placeholder='email' name='email' onChange={(e) => onChange(e)} value={email} />
              <input type="password" placeholder='password' name='password' onChange={(e) => onChange(e)} value={password} />
              <ButtonContainer >
                <Button variant="outline-danger" type='submit' >{loading2 ? <Loader /> : 'Login'}</Button>
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

export default connect(mapStateToProps, { postLogIn })(withRouter(Login));
