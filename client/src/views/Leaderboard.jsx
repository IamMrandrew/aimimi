import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Rank from "../components/Rank";
import TopRank from "../components/TopRank";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../components/Loader";

//Leaderboard page
const Leaderboard = ({ userSharedGoals }) => {
  const [ranks, setRanks] = useState();
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // get the leaderboard of a goal with params equal to the leaderboard.id
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
          <SelectBoxWrapper>
            <SelectBox onChange={selectBoxHandler} value={id}>
              {/* map the title of shared goals in the select box  */}
              {userSharedGoals.map((goal) => (
                <Option key={goal._id} value={goal._id}>
                  {goal.title}
                </Option>
              ))}
            </SelectBox>
            <FaAngleDown />
          </SelectBoxWrapper>
          <Meta>
            <Desc>
              {/* find the period of the userSharedGoals */}
              {userSharedGoals.length > 0 &&
                userSharedGoals.find((goal) => goal._id === id).period}
            </Desc>
            <Desc>
              {/* find the timespan of the userSharedGoals and calculate how many days left */}
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
            {/* For top 3, sending the rank state to the component <TopRank> inorder to show the rank, name, the profile picture and percentage */}
            {ranks &&
              ranks
                .slice(0, 3)
                .map((rank, index) => (
                  <TopRank key={rank._id} index={index + 1} rank={rank} />
                ))}
          </TopBoard>
          {/* send the rank state to the component <TopRank> inorder to show the rank, name, the profile picture and percentage */}
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

const SelectBoxWrapper = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  background-color: #f2f4f6;
  border-radius: 12px;
  max-width: 240px;

  svg {
    width: 20px;
    height: 20px;
    color: var(--monoPrimary);
    pointer-events: none;
    position: absolute;
    top: 12px;
    right: 15px;
  }
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
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 18px;
  font-family: inherit;
  width: 100%;

  &:focus,
  &:hover {
    outline: none;
  }
`;

const Option = styled.option``;
