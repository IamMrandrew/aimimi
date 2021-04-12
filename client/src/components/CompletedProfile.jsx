import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import axios from "axios";
import { FaRegCheckCircle } from "react-icons/fa";
const CompletedProfile = ({ goal }) => {
  const [completed, setCompleted] = useState([]);
  useEffect(() => {
    axios
      .get(`/goal/${goal}`, { withCredentials: true })
      .then((response) => {
        setCompleted(response.data);
        console.log(completed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [completed]);
  return (
    <div>
      <CustomDiv>
        <GoalsTitleDiv>
          <CollapseTextDiv>
            <FaRegCheckCircle />
          </CollapseTextDiv>
          <CollapseGoalsTitle>{completed.title}</CollapseGoalsTitle>
        </GoalsTitleDiv>
      </CustomDiv>
    </div>
  );
};

export default CompletedProfile;
const CustomDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  height: 58px;
  width: 100%;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 10px;
`;
const GoalsTitleDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 35px;
`;

const CollapseTextDiv = styled.span`
  color: #81d3dc;
  font-size: 30px;
`;
const CollapseGoalsTitle = styled.div`
  color: #1c4b56;
  font-weight: 700;
  font-size: 18px;
  margin-left: 27px;
`;
