import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Goal from "../components/Goal";
import AddGoal from "../components/AddGoal";
import axios from "axios";
import Cookies from "universal-cookie";

const Today = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();
    const auth = cookies.get("token");
    axios
      .get(
        "http://localhost:3001/goal",

        { headers: { Authorization: "Bearer " + auth } }
      )
      .then((response) => {
        console.log(response.data);
        setGoals(response.data);
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
