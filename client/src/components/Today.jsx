import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";

const Today = () => {
  return (
    <TodayContainer>
      <CustomContainer>
        <TodayTitle>Today</TodayTitle>
        <TodaySubtitle>Two task left for today</TodaySubtitle>
      </CustomContainer>
    </TodayContainer>
  );
};

export default Today;

const TodayContainer = styled.div``;

const TodayTitle = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: var(--primaryShaded);
  margin-top: 20px;
  margin-bottom: 36px;
`;

const TodaySubtitle = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: var(--primaryTinted);
`;

const CustomContainer = styled(Container)`
  max-width: 888px;
`;
