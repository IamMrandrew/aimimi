import React, { useState } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Rank from "../components/Rank";
import TopRank from "../components/TopRank";

const Leaderboard = () => {
  const [ranks, setRanks] = useState();

  return (
    <Wrapper>
      <CustomContainer>
        <Title>Drink water</Title>
        <TopBoard>
          <TopRank />
          <TopRank />
          <TopRank />
        </TopBoard>
        <Board>
          <Rank />
          <Rank />
          <Rank />
          <Rank />
          <Rank />
          <Rank />
          <Rank />
        </Board>
      </CustomContainer>
    </Wrapper>
  );
};

export default Leaderboard;

const Wrapper = styled.div`
  padding-top: 32px;
  overflow: scroll;
  height: calc(100vh - 60px);

  @media (min-width: 992px) {
    height: calc(100vh - 80px);
  }
`;

const CustomContainer = styled(Container)`
  max-width: 888px;
  position: relative;
`;

const TopBoard = styled.div`
  padding: 0px 20px;
  height: 250px;
  background-color: var(--primaryGoal);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  @media (max-width: 991.98px) {
    height: 200px;
  }
`;

const Board = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 12px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: var(--primaryShaded);
`;
