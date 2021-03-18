import React from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Goal from "../components/Goal";
import AddGoal from "../components/AddGoal";
const Today = () => {
  const goal = [
    {
      title: "Drink Water!",
      period: "Everyday",
      timespan: "86 days left",
      times: 8,
      progress: 0,
    },
    {
      title: "Drink Water!",
      period: "Everyday",
      timespan: "86 days left",
      times: 8,
      progress: 2,
    },
    {
      title: "Drink Water!",
      period: "Everyday",
      timespan: "86 days left",
      times: 8,
      progress: 4,
    },
    {
      title: "Drink Water!",
      period: "Everyday",
      timespan: "86 days left",
      times: 8,
      progress: 8,
    },
  ];

  return (
    <Wrapper>
      <CustomContainer>
        <Title>Today</Title>
        <Subtitle>Three task left for today</Subtitle>
        <Goal goal={goal[0]} />
        <Goal goal={goal[1]} />
        <Goal goal={goal[2]} />
        <Goal goal={goal[3]} />
        <AddGoal />
      </CustomContainer>
    </Wrapper>
  );
};

export default Today;

const Wrapper = styled.div`
  padding-top: 32px;
  flex: 1;
  display: flex;
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
  font-size: 16px;
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
  position: relative;
`;
