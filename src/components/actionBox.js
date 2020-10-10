/* eslint-disable arrow-body-style */
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
display: flex
justify-content: center
width: 100%
height: 100%
margin-right: -14px
position: relative
 `;
const ActionBox = (props) => {
  return (
    <Wrapper >
      {props.children}
    </Wrapper>
  );
};

export default ActionBox;
