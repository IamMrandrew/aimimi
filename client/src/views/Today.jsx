import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Goal from "../components/Goal";
import AddGoal from "../components/AddGoal";
import axios from "axios";

const Today = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/goal",

        { withCredentials: true }
      )
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
        <Title>Today</Title>
        <Subtitle>Three task left for today</Subtitle>
        {goals.map((goal) => (
          <Goal key={goal._id} goal={goal} />
        ))}
        <AddGoal setGoals={setGoals} />
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
