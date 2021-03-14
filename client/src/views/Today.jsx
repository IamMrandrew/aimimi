import React from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Goal from "../components/Goal";
const Today = () => {
  const goal = [
    {
      title: "Drink Water!",
      period: "Everyday",
      timespan: "86 days left",
    },
    {
      title: "Drink Water!",
      period: "Everyday",
      timespan: "86 days left",
    },
    {
      title: "Drink Water!",
      period: "Everyday",
      timespan: "86 days left",
    },
    {
      title: "Drink Water!",
      period: "Everyday",
      timespan: "86 days left",
    },
  ];

  return (
    <Wrapper>
      <CustomContainer>
        <Title>Today</Title>
        <Subtitle>Two task left for today</Subtitle>
        <Goal goal={goal[0]} />
        <Goal goal={goal[1]} />
        <Goal goal={goal[2]} />
        <Goal goal={goal[3]} />
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
