import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "./Loader";

// Compnent of shared goal in Shares page
const SharedGoal = ({ goal, joined, publicGoal, setPublicGoal }) => {
  const History = useHistory();
  const { auth, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [sharedGoalPropic, setSharedGoalPropic] = useState(null);
  const [stat, setStat] = useState(0);

  useEffect(() => {
    // Get creator profile picture by passing creator.id
    axios
      .get(`/user/propic/${goal.createdBy._id}`, { withCredentials: true })
      .then((response) => {
        setSharedGoalPropic(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [goal.createdBy._id]);

  useEffect(() => {
    //  Get the goal details by passing the goal id and set the details in Stat state
    axios
      .get(`/goal/leaderboard/${goal._id}`, { withCredentials: true })
      .then((response) => {
        setStat(response.data.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [goal._id]);

  // Handle Join button
  const joinGoal = (e) => {
    e.preventDefault();
    // Adding a goal to user Ongoing goal by sending a put request with goal.id as paramters
    axios
      .put("/goal/join", { goal_id: goal._id }, { withCredentials: true })
      .then((res) => {
        History.push("/goals");

        // Update user onGoingGoals for auth state
        axios
          .get("/user", { withCredentials: true })
          .then((response) => {
            setAuth(response.data);
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // For admin, let admin to delete unappropriate goals
  const deleteGoalHandler = () => {
    axios
      .delete(`/goal/${goal._id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setPublicGoal(publicGoal.filter((item) => item._id !== goal._id));
  };

  return (
    <Wrapper>
      <Container>
        <FlexDiv>
          <Title>{goal ? goal.title : ""}</Title>
          <FlexDiv>
            <Avator>
              {!loading && <AvatorImg src={sharedGoalPropic} />}
              {loading && <Loader />}
            </Avator>
            <UserName>{goal ? goal.createdBy.username : ""}</UserName>
          </FlexDiv>
        </FlexDiv>

        <SubtitleDiv>
          <Subtitle>{goal ? goal.category : ""}</Subtitle>
          <Subtitle>{goal ? goal.period : ""}</Subtitle>
        </SubtitleDiv>

        <FlexDiv>
          <SubtitleDiv>
            <ItemIcon>
              <FaUsers />
            </ItemIcon>
            <Stat>{stat}</Stat>
            <ItemIcon>
              <FaCalendarAlt />
            </ItemIcon>
            <Stat>{goal ? goal.timespan : ""} days left</Stat>
          </SubtitleDiv>
          {/* Check whether user joined the, show "Join" if not, and show "Joined" otherwise */}
          <Buttons>
            <JoinButton
              disabled={joined}
              onClick={joined ? undefined : joinGoal}
              joined={joined}
            >
              {joined ? "Joined" : "Join"}
            </JoinButton>
            {/* Check if user us Admin, show the delete button if  is admin */}
            {auth.role === "Admin" && (
              <DeleteButton onClick={deleteGoalHandler}>Delete</DeleteButton>
            )}
          </Buttons>
        </FlexDiv>
      </Container>
    </Wrapper>
  );
};

export default SharedGoal;

const Wrapper = styled.div`
  position: relative;
  background-color: #ffffff;
  height: 160px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  margin-top: 9px;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: var(--primaryShaded);
`;

const Subtitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #759198;
  margin-right: 10px;
  margin-bottom: 25px;
`;

const Avator = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 24px;
  margin-right: 13px;
  overflow: hidden;

  & > div {
    height: 100%;
  }

  span {
    border-color: var(--primaryGoal);
  }

  @media (max-width: 991.98px) {
    display: none;
  }
`;

const AvatorImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
`;

const UserName = styled.span`
  font-size: 16px;
  font-family: "Roboto";
  font-weight: 800;
  color: var(--primaryShaded);
`;
const SubtitleDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ItemIcon = styled.span`
  font-size: 14px;
  color: #9e9e9e;
  margin-right: 7px;
`;

const Stat = styled.span`
  color: #9e9e9e;
  font-size: 14px;
  font-weight: 500;
  margin-right: 11px;
`;

const Buttons = styled.div`
  display: flex;
`;

const JoinButton = styled.button`
  display: block;
  align-items: center;
  justify-content: space-between;
  border: none;
  border-radius: 14px;
  background-color: ${(props) =>
    props.joined ? "var(--placeholder)" : "var(--primaryGoal)"};
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  width: 92px;
  height: 32px;
`;

const DeleteButton = styled.button`
  margin-left: 12px;
  padding: 4px 20px;
  display: block;
  align-items: center;
  justify-content: space-between;
  border: none;
  border-radius: 14px;
  background-color: #f28f8f;
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
`;
