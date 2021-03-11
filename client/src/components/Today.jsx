import React from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";

const Today = () => {
  return (
    <Wrapper>
      <CustomContainer>
        <Title>Today</Title>
        <Subtitle>Two task left for today</Subtitle>
      </CustomContainer>
    </Wrapper>
  );
};

export default Today;

const Wrapper = styled.div``;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: var(--primaryShaded);
  margin-top: 20px;
  margin-bottom: 30px;

  @media (max-width: 991.98px) {
    display: none;
  }
`;

const Subtitle = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: var(--primaryTinted);
  display: block;

  @media (max-width: 991.98px) {
    margin-top: 20px;
    font-size: 16px;
  }
`;

const CustomContainer = styled(Container)`
  max-width: 888px;
`;
