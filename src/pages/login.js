import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { GlobalStyle, Screen } from 'styles';
import { Login } from 'components';

const AppContainer = styled.div`
  position: relative;
  margin: 200px 0px 0px 0px;
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
        <title>Login</title>
      </Helmet>
      <GlobalStyle />
      <Login />
    </AppContainer>
  </>
);

export default App;
