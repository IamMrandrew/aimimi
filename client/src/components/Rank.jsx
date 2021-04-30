import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import Loader from "./Loader";
import axios from "axios";

// Rank component except top 3 rank
const Rank = ({ rank, index }) => {
  const [loading, setLoading] = useState(true);
  const [rankPropic, setRankPropic] = useState(null);
  const history = useHistory();

  // Get user profile picture with the rank._id and set it in rankPropic
  useEffect(() => {
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

  // Handle user onClick other user profile picture
  const onClickHandler = (e) => {
    e.preventDefault();
    // Route user to the profile of that user
    history.push(`/profile/${rank._id}`);
  };

  return (
    <Wrapper onClick={onClickHandler} data-testid='rankButton'>
      <ItemWrapper>
        {/* Ranking of user */}
        <Flag>#{index}</Flag>
        <Avator>
          {!loading && <AvatorImg src={rankPropic} />}
          {loading && <Loader />}
        </Avator>
        <Item>{rank.username}</Item>
      </ItemWrapper>
      <Item>{Math.round(rank.accuracy)}%</Item>
    </Wrapper>
  );
};

export default Rank;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  cursor: pointer;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Flag = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--primaryShaded);
  margin-right: 25px;
`;

const Item = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--primaryShaded);
`;

const Avator = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 24px;
  margin-right: 10px;
  overflow: hidden;

  & > div {
    height: 100%;
  }

  span {
    border-color: var(--primaryGoal);
  }
`;

const AvatorImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
`;
