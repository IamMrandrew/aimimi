import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Goal from "../components/Goal";
import AddGoal from "../components/AddGoal";
import CheckInModal from "../components/CheckInModal";
import { AuthContext } from "../contexts/AuthContext";

const Today = ({ showModal, setShowModal, goals, setGoals }) => {
  const [selectedGoal, setSelectedGoal] = useState(0);
  const [selectedGoalCheckIn, setSelectedGoalCheckIn] = useState(0);
  const { auth } = useContext(AuthContext);
  const [tasksLeft, setTaskLeft] = useState(0);

  useEffect(() => {
    if (goals.length > 0 && auth.onGoingGoals) {
      setTaskLeft(
        auth.onGoingGoals.filter(
          (goal) =>
            goal.check_in !==
            goals.find((item) => item._id === goal.goal_id).frequency
        ).length
      );
    }
  }, [goals, auth.onGoingGoals]);

  return (
    <Wrapper>
      <CustomContainer>
        <Title>Today</Title>
        <Subtitle>{tasksLeft} tasks left for today</Subtitle>
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
      </CustomContainer>
      <CheckInModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedGoal={selectedGoal}
        selectedGoalCheckIn={selectedGoalCheckIn}
      />
    </Wrapper>
  );
};

export default Today;

const Wrapper = styled.div`
  padding-top: 32px;
  flex: 1;
  display: flex;
  overflow: hidden;
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
  overflow: scroll;
  height: calc(100vh - 60px);

  @media (min-width: 992px) {
    height: calc(100vh - 80px);
  }
`;
