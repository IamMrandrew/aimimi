import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import Loader from "./Loader";
import axios from "axios";

const Rank = ({ rank, index }) => {
  const [loading, setLoading] = useState(true);
  const [rankPropic, setRankPropic] = useState(null);

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
  }, [rank]);

  return (
    <Wrapper>
      <ItemWrapper>
        <Flag>#{index}</Flag>
        <Avator>
          {!loading && <AvatorImg src={rankPropic} />}
          {loading && <Loader />}
        </Avator>
        <Item>{rank.username}</Item>
      </ItemWrapper>
      <Item>{rank.accuracy}%</Item>
    </Wrapper>
  );
};

export default Rank;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
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
  object-fit: cover;
  object-position: center center;
`;
