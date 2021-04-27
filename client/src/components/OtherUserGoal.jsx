import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import {
  FaCheckCircle,
  FaBullseye,
  FaAngleDown,
  FaRegCheckSquare,
} from "react-icons/fa";
import Collapse from "react-bootstrap/Collapse";
import axios from "axios";
import Loader from "../components/Loader";

// Component of showing other user goal in other user profile
const OtherUserGoal = ({ goal, type }) => {
  const [userGoal, setUserGoal] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Get the goal details by passing goal.goal_id with get request
    // First to the type is "onGoing" or "completed"
    axios
      .get(`/goal/${type === "onGoing" ? goal.goal_id : goal}`, {
        withCredentials: true,
      })
      .then((res) => {
        // set the goal in userGoal state
        setUserGoal(res.data);
        console.log("this is goal:", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [goal, type]);
  return (
    <div>
      <CustomDiv>
        <GoalsTitleDiv>
          <CollapseTextDiv>
            <FaBullseye />
          </CollapseTextDiv>
          <CollapseGoalsTitle>{!loading && userGoal.title}</CollapseGoalsTitle>
        </GoalsTitleDiv>
      </CustomDiv>
    </div>
  );
};

export default OtherUserGoal;

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
