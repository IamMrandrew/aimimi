import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Rank from "../components/Rank";
import TopRank from "../components/TopRank";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../components/Loader";

const Leaderboard = ({ sharedGoals }) => {
  const [ranks, setRanks] = useState();
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/goal/leaderboard/${id}`, { withCredentials: true })
      .then((response) => {
        setRanks(response.data.data);
        setLoading(false);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const selectBoxHandler = (e) => {
    history.push(`/leaderboard/${e.target.value}`);
  };

  return (
    <Wrapper>
      {!loading && (
        <CustomContainer>
          <SelectBox onChange={selectBoxHandler}>
            {sharedGoals.map((goal) => (
              <Option value={goal._id}>{goal.title}</Option>
            ))}
          </SelectBox>
          <Title>
            {sharedGoals.length > 0 &&
              sharedGoals.find((goal) => goal._id === id).title}
          </Title>
          <Meta>
            <Desc>
              {sharedGoals.length > 0 &&
                sharedGoals.find((goal) => goal._id === id).period}
            </Desc>
            <Desc>
              {sharedGoals.length > 0 &&
                sharedGoals.find((goal) => goal._id === id).timespan -
                  Math.floor(
                    (Date.now() -
                      Date.parse(
                        sharedGoals.find((goal) => goal._id === id).startTime
                      )) /
                      (1000 * 3600 * 24)
                  )}{" "}
              days left
            </Desc>
          </Meta>
          <TopBoard>
            {ranks &&
              ranks
                .slice(0, 3)
                .map((rank, index) => (
                  <TopRank key={rank._id} index={index + 1} rank={rank} />
                ))}
          </TopBoard>
          {ranks && ranks.slice(3).length > 0 && (
            <Board>
              {ranks &&
                ranks
                  .slice(3)
                  .map((rank, index) => (
                    <Rank key={rank._id} index={index + 4} rank={rank} />
                  ))}
            </Board>
          )}
        </CustomContainer>
      )}
      {loading && <Loader />}
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
  margin-bottom: 2px;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;
const Desc = styled.span`
  color: var(--primaryTinted);
  font-weight: 500;
  font-size: 16px;
  margin-right: 16px;
`;

const SelectBox = styled.select``;

const Option = styled.option``;
