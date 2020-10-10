/* eslint-disable no-unused-vars */
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
import { updatePassword, getProfile, updateProfile } from '../redux/action/auth';
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
  align-items: center
  margin: 40px 0px 75px;
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
  select {
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
    option[default] {
      color: #c6c6c6c;
    }
  }
  .selectPlaceholder {
    color: #c6c6c6 !important;
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
  justify-content: center;
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

const LoaderCon = styled.div`
position: absolute;
top: 30%;
left: 50%;
transform: translate(-50%, -50%);
`;
const nameWidth = {
  width: '100%',
};

const Profile = ({
  updatePassword, setAlert, getProfile, updateProfile, profile: {
    profileLoader, userProfile, userProfileError, isAuthenticated,
  },
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    phoneNumber: '',
    profileImage: '',
    upload: null,
    loading2: false,
  });

  useEffect(() => {
    if (isAuthenticated) {
      getProfile();
    }
  // eslint-disable-next-line
  }, [isAuthenticated]);

  useEffect(() => {
    if (userProfile !== null) {
      setFormData({
        firstName: profileLoader || !userProfile.firstName ? '' : userProfile.firstName,
        lastName: profileLoader || !userProfile.lastName ? '' : userProfile.lastName,
        profileImage: profileLoader || !userProfile.profileImage ? '' : userProfile.profileImage,
        phoneNumber: profileLoader || !userProfile.phoneNumber ? '' : userProfile.phoneNumber,
        upload: null,
      });
    }
    // eslint-disable-next-line
  }, [userProfile]);

  const {
    loading2,
    firstName,
    lastName,
    gender,
    profileImage,
    upload,
    phoneNumber,
  } = formData;

  const theme = {
    display: '',
  };

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleChange = (e) => {
    setFormData({ ...formData, upload: e.target.files[0], profileImage: URL.createObjectURL(e.target.files[0]) });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, loading2: true });
    await updateProfile({
      firstName,
      profileImage,
      phoneNumber,
      gender,
      upload,
      lastName,
    });
    setFormData({ ...formData, loading2: false });
  };

  // console.log(formData);
  return (
    <>
      <ThemeProvider theme={theme}>

        <Wrapper>
          <Row>
            <Col xs={8} md={7}>
            <Alert />
            { profileLoader ? <LoaderCon><Loader /></LoaderCon> : <>
              <FormCon>
              <FormHeader>Update Profile</FormHeader>
                <Form onSubmit={(e) => onSubmit(e)} >
                  {userProfileError ? <Alert /> : null}
                  <input
                    type="text"
                    placeholder='First Name'
                    name='firstName'
                    className="form-control"
                    onChange={(e) => onChange(e)}
                    style={nameWidth}
                    value={firstName} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder='Last Name'
                    name='lastName'
                    value={lastName}
                    style={nameWidth}
                    onChange={(e) => onChange(e)} />
                    <select type="text" name='gender' onBlur={(e) => onChange(e)} className='selectStyle' onChange={(e) => onChange(e)} required >
                      <option>Select Gender</option>
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                    </select>
                  <input
                    type="text"
                    placeholder='Phone Number'
                    name='phoneNumber'
                    className="form-control"
                    onChange={(e) => onChange(e)}
                    style={nameWidth}
                    value={phoneNumber} />
                  <ProfileImage>
                    <div className="overlay">
                      <label htmlFor="file-input1">
                        <img src={userProfile.profileImage} alt="+" style={{ width: '30%', padding: '30px' }} />
                      </label>
                      <input id="file-input1" type="file" onChange={(e) => handleChange(e)} />
                    </div>
                    <div className='box'>
                      {
                        profileImage !== null ? <img src={profileImage} alt="" style={{ width: '100%', height: '100%' }} />
                          : <span style={{ fontSize: '12px' }} >
                            +
                      </span>
                      }
                    </div>
                  </ProfileImage>
                  <ButtonContainer >
                    <Button variant="outline-primary" type='submit' >{loading2 ? <Loader /> : 'Update Profile'}</Button>
                  </ButtonContainer>
                </Form>
              </FormCon>
            </>
            }
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

export default connect(mapStateToProps, {
  updatePassword, setAlert, getProfile, updateProfile,
})(Profile);
