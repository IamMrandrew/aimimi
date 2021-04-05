import React, { useEffect } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Profilephoto from "../assets/ProfilePhoto.png";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SharedGoal = ({ goal }) => {
  const History = useHistory();
  const joinGoal = (e) => {
    e.preventDefault();
    axios
      .put("/goal/join", { goal_id: goal._id }, { withCredentials: true })
      .then((res) => {
        History.push("/goals");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <Container>
        <FlexDiv>
          <Title>{goal ? goal.title : ""}</Title>
          <FlexDiv>
            <Profile src={Profilephoto} />
            <UserName>Jane Doe</UserName>
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
            <Stat>1223</Stat>
            <ItemIcon>
              <FaCalendarAlt />
            </ItemIcon>
            <Stat>{goal ? goal.timespan : ""} days left</Stat>
          </SubtitleDiv>
          <JoinButton onClick={joinGoal}>Join</JoinButton>
        </FlexDiv>
      </Container>
    </Wrapper>
  );
};

export default SharedGoal;

const Wrapper = styled.div`
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

const Profile = styled.img`
  margin-right: 13px;
  width: 36px;
  height: 35px;
  @media (max-width: 991.98px) {
    display: none;
  }
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

const JoinButton = styled.button`
  display: block;
  align-items: center;
  justify-content: space-between;
  border: none;
  border-radius: 14px;
  background-color: var(--primaryGoal);
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  width: 92px;
  height: 32px;
`;
