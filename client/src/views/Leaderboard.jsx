import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Rank from "../components/Rank";
import TopRank from "../components/TopRank";
import axios from "axios";
import { useParams } from "react-router";

const Leaderboard = ({ sharedGoals }) => {
  const [ranks, setRanks] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/goal/leaderboard/${id}`, { withCredentials: true })
      .then((response) => {
        setRanks(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Wrapper>
      <CustomContainer>
        <Title>
          {sharedGoals.length > 0 &&
            sharedGoals.find((goal) => goal._id === id).title}
        </Title>
        <TopBoard>
          {ranks &&
            ranks
              .slice(0, 3)
              .map((rank) => <TopRank key={rank._id} rank={rank} />)}
        </TopBoard>
        <Board>
          {ranks &&
            ranks.slice(3).map((rank) => <Rank key={rank._id} rank={rank} />)}
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
