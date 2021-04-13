import React, { useState } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Goal from "../components/Goal";
import AddGoal from "../components/AddGoal";
import CheckInModal from "../components/CheckInModal";

const Today = ({ showModal, setShowModal, goals, setGoals }) => {
  const [selectedGoal, setSelectedGoal] = useState(0);
  const [selectedGoalCheckIn, setSelectedGoalCheckIn] = useState(0);

  return (
    <Wrapper>
      <CustomContainer>
        <Title>Today</Title>
        <Subtitle>Three task left for today</Subtitle>
        {goals.map((goal) => (
          <Goal
            key={goal._id}
            goal={goal}
            showModal={showModal}
            setShowModal={setShowModal}
            setSelectedGoal={setSelectedGoal}
            setSelectedGoalCheckIn={setSelectedGoalCheckIn}
          />
        ))}
        <AddGoal setGoals={setGoals} />
        <CheckInModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedGoal={selectedGoal}
          selectedGoalCheckIn={selectedGoalCheckIn}
        />
      </CustomContainer>
    </Wrapper>
  );
};

export default Today;

const Wrapper = styled.div`
  padding-top: 32px;
  flex: 1;
  display: flex;
  overflow: scroll;
  height: calc(100vh - 60px);

  @media (min-width: 992px) {
    height: calc(100vh - 80px);
  }
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
`;
