import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Rank from "../components/Rank";
import TopRank from "../components/TopRank";
import axios from "axios";
import { useParams } from "react-router";

const Leaderboard = () => {
  const [ranks, setRanks] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/goal/leaderboard${id}`, { withCredentials: true })
      .then((response) => {
        setRanks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setRanks([
      {
        _id: "606b3414d71340278d3b0da0",
        username: "Andrew Li",
        accuracy: 50.0,
      },
      { _id: "606b3414d71340278d3b0da0", username: "Andrew B", accuracy: 50.0 },
      { _id: "606b3414d71340278d3b0da0", username: "Andrew C", accuracy: 50.0 },
      { _id: "606b3414d71340278d3b0da0", username: "Andrew D", accuracy: 70.0 },
      { _id: "606b3414d71340278d3b0da0", username: "Andrew E", accuracy: 40.0 },
      { _id: "606b3414d71340278d3b0da0", username: "Andrew F", accuracy: 30.0 },
    ]);
  }, []);

  return (
    <Wrapper>
      <CustomContainer>
        <Title>Drink water</Title>
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
