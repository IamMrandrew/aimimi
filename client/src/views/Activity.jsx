import React from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Feed from "../components/Feed";
const Activity = () => {
  return (
    <Wrapper>
      <CustomContainer>
        <Title>Activity</Title>
        <Feed />
        <Feed />
        <Feed />
      </CustomContainer>
    </Wrapper>
  );
};

export default Activity;

const Wrapper = styled.div`
  padding-top: 32px;
  flex: 1;
  display: flex;
`;

const CustomContainer = styled(Container)`
  max-width: 888px;
  position: relative;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--primaryShaded);
  margin-bottom: 30px;

  @media (max-width: 991.98px) {
    display: none;
  }
`;
