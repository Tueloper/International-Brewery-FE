/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import {
  Col, Row, Button, Form,
} from 'react-bootstrap';
import { Screen } from 'styles';
// import { ReactComponent as Arrow } from 'components/svg/arrow.svg';
import ActionBox from './actionBox';
import { updatePassword, getProfile } from '../redux/action/auth';
import { setAlert } from '../redux/action/alert';
import Alert from './alert';
import { ReactComponent as Loader } from './svg/loader.svg';

const Wrapper = styled.div`
position: relative
margin: 0
width: 100%
height: 100%;
margin-bottom: 50px
// overflow: auto;
.row{
  height: 100%
  // width: 100%
}
.col{
  min-width: 40%  !important
  max-width: 40% !important
}
.col-md-7, .col-8 {
  position: relative
  background: #fff;
  margin: 0
  padding: 0
}
.btn_container{
  // position: absolute;
  // bottom: 10px;
  // left: 50%;
  // transform: translate(-50%, -50%);
  display: flex
  justify-content: flex-start;
  margin: 5px 0px
  outline: none
}
.btn-outline-primary.focus, .btn-outline-primary:focus {
  box-shadow: none
}
.btn{
  font-weight: 500
  padding: 3px 30px
  border-radius: 10px
  outline: none
}
.empty {
  margin-top: 100px;
}
.icon {
  margin-right: 5px;
}
`;

const Wrapper2 = styled.div`
display: flex
justify-content: center
width: 100%
height: 100%
`;

const FormCon = styled.div`
  display: flex
  width: 60%;
  flex-direction: column
  align-items: flex-start
  margin: 40px 50px 75px;
  form{
    display: flex;
    flex-flow: column nowrap
    width: 80%
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input{
    margin-bottom: 25px
    border: 1px solid #5555
    padding: 5px 30px
    border-radius: 15px
    outline: none;
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem 1rem;
    font-size: 1rem;
    font-weight: 400;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
  .form-control{
    padding: 10px 30px
    border-radius: 15px
    resize: none
  }
  input::placeholder{
    color: #5555
  }
  textarea::placeholder{
    color: #5555
  }
  .btn{
  background: #fff
    border-radius: 25px
    outline: none
    &:hover{
      background: #007bff
    }
  }
  ${Screen.screen993`
  width: 80%;
  `}
  ${Screen.tablet`
  width: 100%;
  `}
  ${Screen.largePhone`
      width: 100%;
`}
`;

const FormHeader = styled.div`
  font-size: 1rem;
  margin-bottom: 20px;
  color: #3268ae
  font-weight: 700
`;

const ButtonContainer = styled.div`
  display: flex
  width: 100%
  justify-content: flex-start;
  align-items: center
`;

const ProfileContainer = styled.div`
  display: flex
  width: 100%
  justify-content: center;
  padding: 0 !important
  margin: 0 !important
   .loader {
     margin-top: 60%;
   }
`;

const ProfileDisplay = styled.div`
   margin: 40px 5px 10px;
   display: flex;
   width: 100%
   flex-direction: column
   align-items: center;
   height: 100vh;
`;

const ProfileDetails = styled.h5`
  font-size: 1rem;
  margin-bottom: 20px;
  color: #3268ae
  font-weight: 700
  margin: 10px 5px;
`;

const ProfileImage = styled.div`
margin: 20px
margin-top: 5px
position: relative;
.overlay{
  width: 150px;
  padding: 10px;
  min-height: 150px;
  // border: 1px solid #DCDCDC;
  border-radius: 4px;
  align-items: center;
  display: flex;
  position: absolute;
  justify-content: center;
}
.overlay img{
  width: 100%
  height: 100%
  z-index: 1000
}
.box{
  width: 150px;
  padding: 10px;
  background: #fff
  min-height: 150px;
  border: 1px solid #5555;
  border-radius: 10px;
margin : 0 auto
// position: relative;
}
.box span{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #5555
}
`;

const Profile = ({
  updatePassword, setAlert, getProfile, profile: { profileLoader, userProfile, userProfileError, isAuthenticated },
}) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    loading2: false,
    loading3: false,
  });

  const {
    oldPassword, newPassword, confirmPassword, loading2, loading3,
  } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return setAlert('Password does not match', 'warning');
    setFormData({ ...formData, loading2: true });
    await updatePassword({ oldPassword, newPassword, confirmPassword });
    setFormData({ ...formData, loading2: false });
    setFormData({
      ...formData, oldPassword: '', newPassword: '', confirmPassword: '',
    });
  };

  const theme = {
    display: '',
  };

  useEffect(() => {
    if (isAuthenticated) {
      getProfile();
    }
  // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <>
      <ThemeProvider theme={theme}>

        <Wrapper>
          <Row>
            <Col xs={8} md={7}>
            <Alert />
            <FormCon>
              <FormHeader>Change Password</FormHeader>
              <Form onSubmit={(e) => onSubmit(e)} >
                <input
                  type="password"
                  placeholder='Current Password'
                  name='oldPassword'
                  className="form-control"
                  onChange={(e) => onChange(e)}
                  value={oldPassword}
                  required/>
                <input
                  type="password"
                  placeholder='New Password'
                  name='newPassword'
                  className="form-control"
                  onChange={(e) => onChange(e)}
                  value={newPassword}
                  required/>
                <input
                  type="password"
                  placeholder='Confirm Password'
                  name='confirmPassword'
                  className="form-control"
                  onChange={(e) => onChange(e)}
                  value={confirmPassword}
                  required/>

                <ButtonContainer >
                  <Button variant="outline-primary" type='submit' >{loading2 ? <Loader /> : 'Change Password'}</Button>
                </ButtonContainer>
              </Form>
            </FormCon>
            {/* <FormCon>
              <FormHeader>Update Email</FormHeader>
              <Form onSubmit={(e) => updateEmail(e)} >
                <input
                  type="email"
                  placeholder='New Password'
                  name='email'
                  className="form-control"
                  onChange={(e) => onChange(e)}
                  value={email}
                  required/>
                <ButtonContainer >
                  <Button variant="outline-primary" type='submit' >{loading3 ? <Loader /> : 'Update Email'}</Button>
                </ButtonContainer>
              </Form>
            </FormCon> */}
            </Col>
            < Col>
              <Wrapper2>
                <ActionBox>
                  <ProfileContainer>
                    {profileLoader && <Loader className='loader'/>}
                    {userProfileError && <Alert/>}
                    {
                      userProfile
                      && <ProfileDisplay>
                        <div>
                        <ProfileImage className='step_2'>
                            <div className="overlay">
                              <img src={userProfile.profileImage} alt="" style={{ width: '30%', padding: '30px' }} />
                            </div>
                            <div className='box'>
                              {
                                userProfile.profileImage !== null ? <img src={userProfile.profileImage} alt="" style={{ width: '100%', height: '100%' }} />
                                  : <span>
                                    Image
                                </span>
                              }
                            </div>
                          </ProfileImage>
                            <ProfileDetails>{`Name: ${userProfile.firstName} ${userProfile.lastName}`}</ProfileDetails>
                            {userProfile.gender !== null && <ProfileDetails>{`Gender: ${userProfile.gender}`}</ProfileDetails>}
                            {userProfile.birthDate !== null && <ProfileDetails>{`DOB: ${userProfile.birthDate}`}</ProfileDetails>}
                            {userProfile.phoneNumber !== null && <ProfileDetails>{`Phone Number: ${userProfile.phoneNumber}`}</ProfileDetails>}
                            <ProfileDetails>{`Email: ${userProfile.email}`}</ProfileDetails>
                        </div>
                      </ProfileDisplay>
                    }
                  </ProfileContainer>
                </ActionBox>
              </Wrapper2>

            </ Col>
          </Row>
        </Wrapper>

      </ThemeProvider>
    </>
  );
};
const mapStateToProps = (state) => ({
  profile: state.Auth,
});

export default connect(mapStateToProps, { updatePassword, setAlert, getProfile })(Profile);
