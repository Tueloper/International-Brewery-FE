/* eslint-disable no-shadow */
import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { GlobalStyle, Screen } from 'styles';
import { Profile } from 'components';

const AppContainer = styled.div`
background: #F4F7FC;
  position: relative;
  display: flex;
  margin: 50px 0px 0px 0px;
  height: auto;
  width: 100%

  .container-lg{
    margin: 0
    padding: 0
    display: flex
    max-width: 1800px
    overflow: hidden
justify-content: center
flex-flow: row
  }
  ${Screen.tablet`
  margin-top: 100px
`}
  ${Screen.largePhone`
  margin-top: 100px
  margin-left: 10px;
  margin-right: 10px;
`};
  ${Screen.screen425`
  margin-top: 50px
  margin-left: 10px;
  margin-right: 10px;
`};
`;

const App = () => (
    <>
      <AppContainer >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Dashboard || Profile</title>
        </Helmet>
        <GlobalStyle />
        <div className='container-lg'>
          <Profile />
        </div>
      </AppContainer>

    </>
);

export default App;
