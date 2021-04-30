import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import Loader from "./Loader";
import axios from "axios";
import { useHistory } from "react-router-dom";
// Component for showing the top 3 ranks in leaderboard
const TopRank = ({ rank, index }) => {
  const [loading, setLoading] = useState(true);
  const [rankPropic, setRankPropic] = useState(null);
  const history = useHistory();
  useEffect(() => {
    // get user profile picture by passing by user ID which store in the rank state
    axios
      .get(`/user/propic/${rank._id}`, { withCredentials: true })
      .then((response) => {
        setRankPropic(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rank._id]);

  const onClickHandler = (e) => {
    e.preventDefault();
    // If user clicked the profile picture, redirect to the that user profile
    history.push(`/profile/${rank._id}`);
  };

  return (
    <Wrapper index={index}>
      <Content index={index} onClick={onClickHandler} data-testid='topRankButton'>
        <Flag index={index}>#{index}</Flag>
        <Avator>
          {!loading && <AvatorImg src={rankPropic} />}
          {loading && <Loader />}
        </Avator>
        <Item>{rank.username}</Item>
        <Item>{Math.round(rank.accuracy)}%</Item>
      </Content>
    </Wrapper>
  );
};

export default TopRank;

const Wrapper = styled.div`
  padding: 0px 15px;
  display: flex;
  align-items: flex-end;
  order: ${(props) =>
    props.index === 1 ? 2 : props.index === 2 ? 1 : props.index === 3 ? 3 : 1};

  @media (max-width: 991.98px) {
    padding: 0px 4px;
  }
`;

const Content = styled.div`
  height: 100%;
  min-width: 140px;
  max-height: ${(props) =>
    props.index === 1
      ? "215px"
      : props.index === 2
      ? "196px"
      : props.index === 3
      ? "172px"
      : "215px"};
  cursor: pointer;

  justify-content: space-between;
  background-color: white;
  padding: 20px;
  border-radius: 14px 14px 0px 0px;

  @media (max-width: 991.98px) {
    min-width: 100px;
    max-height: ${(props) =>
      props.index === 1
        ? "180px"
        : props.index === 2
        ? "168px"
        : props.index === 3
        ? "160px"
        : "180px"};
  }

  span:nth-child(1) {
    text-align: right;
  }
`;

const Flag = styled.span`
  text-align: center;
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) =>
    props.index === 1
      ? "#FDA428"
      : props.index === 2
      ? "#989898"
      : props.index === 3
      ? "#C5852D"
      : "var(--primaryShaded)"};
`;

const Item = styled.span`
  text-align: center;
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: "var(--primaryShaded)";
`;

const Avator = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 24px;
  margin-top: 16px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;

  & > div {
    height: 100%;
  }

  span {
    border-color: var(--primaryGoal);
  }

  @media (max-width: 991.98px) {
    margin-top: 6px;
    margin-bottom: 10px;
  }
`;

const AvatorImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
`;
