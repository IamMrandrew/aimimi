import React from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";

import SharedGoal from "../components/SharedGoal";

const Shares = () => {
  return (
    <Wrapper>
      <CustomContainer>
        <Title>Shares</Title>
        <Subtitle>Recommended For You</Subtitle>
        <SharedGoal />
        <SharedGoal />
        <Subtitle>Trending</Subtitle>
        <SharedGoal />
      </CustomContainer>
    </Wrapper>
  );
};

export default Shares;
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

const Subtitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  display: block;
  margin-top: 38px;

  @media (max-width: 991.98px) {
  }
`;
