import React from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import AddGoal from "../components/AddGoal";
import OngoingGoal from "../components/OngoingGoal";

// Goals page
const Goals = ({ goals, setGoals }) => {
  return (
    <Wrapper data-testid="goalsPage">
      <CustomContainer>
        <Title>Goals</Title>

        {/* we pass the goals state to component <OngoingGoal> */}
        {goals.map((goal) => (
          <OngoingGoal key={goal._id} goal={goal} />
        ))}

        {/* Show add goal button */}
        <AddGoal setGoals={setGoals} />
      </CustomContainer>
    </Wrapper>
  );
};

export default Goals;

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

const CustomContainer = styled(Container)`
  max-width: 888px;
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
