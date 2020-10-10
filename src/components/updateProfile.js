/* eslint-disable max-len */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import {
  Form, Button,
} from 'react-bootstrap';
import { Screen } from 'styles';
import { connect } from 'react-redux';
import styled from 'styled-components';
// import plus from '../images/plus.png';
import { ReactComponent as Loader } from './svg/loader.svg';
import Alert from './alert';
import { updateProfile } from '../redux/action/auth';

const ProfileContainer = styled.div`
  display: flex
  width: 100%
  flex-direction: column
  align-items: center;
  padding: 0px 20px;
  margin: 0 !important
   .loader {
     margin-top: 60%;
   }
`;

const FormCon = styled.div`
  display: flex
  width: 100%;
  justify-content: flex-start
  margin: 50px 50px 10px;
  form{
    display: flex;
    flex-flow: column nowrap
    width: 100%;
    align-items: flex-start;
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
  .inputDate {
    display: flex;
    width: 100%
    align-items: center;
    justify-content: space-between;
    span {
      margin-left: 5px;
      margin-top: -24px;
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

const MaterialImage = styled.div`
margin: 20px
margin-top: 5px
position: relative;
display: flex;
width: 75%;
justify-content: center;
.overlay{
  width: 150px;
  padding: 10px;
  min-height: 150px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  position: absolute;
  justify-content: center;
}
.overlay > input {
  display: none;
}
.overlay img{
  width: 100%
  height: 100%
  z-index: 1000
  cursor: pointer
}
.overlay label{
  display: none
}
.overlay:hover label{
  display: contents
}
.overlay:hover{
  background: #555
  // cursor: pointer
}

.box{
  width: 150px;
  padding: 10px;
  min-height: 150px;
  border: 1px solid #5555;
  border-radius: 10px;
  background: #fff;
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
#file-input1{
  width: 100%
  height: 100%
  z-index: 1000
  cursor: pointer
}
`;

const ButtonContainer = styled.div`
  display: flex
  width: 80%
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 0;
`;

const LoaderCon = styled.div`
position: absolute;
top: 30%;
left: 50%;
transform: translate(-50%, -50%);
`;
const nameWidth = {
  width: '80%',
};

const ProfileDisplay = styled.div`
   margin: 50px 5px 10px;
   display: flex;
   width: 100%
   flex-direction: column
   align-items: flex-start;
`;

const ProfileDetails = styled.h5`
  font-size: 1rem;
  color: #3268ae
  font-weight: 700
  margin: 8px 5px;
`;

const UpdateProfile = ({
  updateProfile, deleteUser, getCompanyFacilities, toggle, loading, profile: {
    userProfile, userProfileError, profileLoader,
  },
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    phoneNumber: '',
    profileImage: '',
    loading2: false,
    loading3: false,
    upload: null,
  });

  useEffect(() => {
    getCompanyFacilities();
  }, [getCompanyFacilities]);

  useEffect(() => {
    if (userProfile !== null) {
      setFormData({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        birthDate: profileLoader || !userProfile.birthDate ? '' : userProfile.birthDate,
        profileImage: profileLoader || !userProfile.profileImage ? '' : userProfile.profileImage,
        phoneNumber: profileLoader || !userProfile.phoneNumber ? '' : userProfile.phoneNumber,
        upload: null,
      });
    }
    // eslint-disable-next-line
  }, [userProfile]);

  useEffect(() => {
    setFormData({
      ...formData,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      birthDate: userProfile.birthDate || '',
      phoneNumber: userProfile.phoneNumber,
      profileImage: userProfile.profileImage,
    });
    // eslint-disable-next-line
  }, [userProfile]);
  const {
    firstName, lastName, profileImage, birthDate, upload, loading2, phoneNumber, loading3,
  } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, upload: e.target.files[0], profileImage: URL.createObjectURL(e.target.files[0]) });
  };
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, loading2: true });
    await updateProfile({
      id: userProfile.id,
      email: userProfile.email,
      firstName,
      profileImage,
      birthDate,
      phoneNumber,
      upload,
      lastName,
    });
    setFormData({ ...formData, loading2: false });
  };

  const deleteUserProfile = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, loading3: true });
    await deleteUser({
      email: userProfile.email,
    });
    setFormData({ ...formData, loading3: false });
    return toggle();
  };

  return (
    <ProfileContainer>
      { loading ? <LoaderCon><Loader /></LoaderCon> : <>
        <FormCon>
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

            <div className='inputDate'>
              <input
                type="date"
                placeholder='Birth Date'
                name='birthDate'
                className="form-control"
                onChange={(e) => onChange(e)}
                style={nameWidth}
                value={birthDate} />
              <span>{birthDate}</span>
            </div>
            <input
              type="text"
              placeholder='Phone Number'
              name='phoneNumber'
              className="form-control"
              onChange={(e) => onChange(e)}
              style={nameWidth}
              value={phoneNumber} />
            <MaterialImage>
              <div className="overlay">
                <label htmlFor="file-input1">
                  <img src={plus} alt="" style={{ width: '30%', padding: '30px' }} />
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
            </MaterialImage>
            <ButtonContainer >
              <Button variant="outline-primary" type='submit' >{loading2 ? <Loader /> : 'Update Profile'}</Button>
              <Button variant="outline-primary" type='click' onClick={(e) => deleteUserProfile(e)} >{loading3 ? <Loader /> : 'Delete User'}</Button>
            </ButtonContainer>
          </Form>
        </FormCon>

        <ProfileDisplay>
          {userProfile && userProfile.role && <ProfileDetails>{`Role: ${userProfile.role.role}`}</ProfileDetails>}
          {userProfile && userProfile.facility && <ProfileDetails>{userProfile.facility.facilityName}</ProfileDetails>}
          {userProfile && userProfile.facility && <ProfileDetails>{userProfile.facility.facilityAddress}</ProfileDetails>}
          {userProfile && userProfile.facility && <ProfileDetails className='step_1'>{userProfile.facility.facilityNumber}</ProfileDetails>}
        </ProfileDisplay>
      </>
      }
    </ProfileContainer>
  );
};

const mapStateToProps = (state) => ({
  profile: state.Auth,
});

export default connect(mapStateToProps, { updateProfile, deleteUser, getCompanyFacilities })(UpdateProfile);
