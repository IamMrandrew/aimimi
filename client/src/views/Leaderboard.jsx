import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Rank from "../components/Rank";
import TopRank from "../components/TopRank";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../components/Loader";

const Leaderboard = ({ userSharedGoals }) => {
  const [ranks, setRanks] = useState();
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
          <SelectBox onChange={selectBoxHandler} value={id}>
            {userSharedGoals.map((goal) => (
              <Option value={goal._id}>{goal.title}</Option>
            ))}
          </SelectBox>
          <Meta>
            <Desc>
              {userSharedGoals.length > 0 &&
                userSharedGoals.find((goal) => goal._id === id).period}
            </Desc>
            <Desc>
              {userSharedGoals.length > 0 &&
                userSharedGoals.find((goal) => goal._id === id).timespan -
                  Math.floor(
                    (Date.now() -
                      Date.parse(
                        userSharedGoals.find((goal) => goal._id === id)
                          .startTime
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

const Meta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 5px 12px;
`;
const Desc = styled.span`
  color: var(--primaryTinted);
  font-weight: 500;
  font-size: 16px;
  margin-right: 16px;
`;

const SelectBox = styled.select`
  padding: 8px 12px;
  font-size: 28px;
  font-weight: 600;
  color: var(--primaryShaded);
  margin-bottom: 2px;
  border: 0px;
  cursor: pointer;
  background-color: #f2f4f6;
  border-radius: 8px;
  /* appearance: none;
-webkit-appearance: none;
-moz-appearance: none; */
  font-size: 18px;
  font-family: inherit;

  &:focus,
  &:hover {
    outline: none;
  }
`;

const Option = styled.option``;
