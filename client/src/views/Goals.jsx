import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import axios from "axios";
import AddGoal from "../components/AddGoal";
import OngoingGoal from "../components/OngoingGoal";

const Goals = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    axios
      .get("/goal", { withCredentials: true })
      .then((response) => {
        setGoals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Wrapper>
      <CustomContainer>
        <Title>Goals</Title>

        {goals.map((goal) => (
          <OngoingGoal key={goal._id} goal={goal} />
        ))}

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
