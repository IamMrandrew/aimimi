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

const OtherUserGoal = ({ goal, type }) => {
  const [userGoal, setUserGoal] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`/goal/${type === "onGoing" ? goal.goal_id : goal}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserGoal(res.data);
        console.log("this is goal:", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  });
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
