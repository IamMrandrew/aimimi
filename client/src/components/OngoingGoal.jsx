import React from "react";
import styled from "styled-components/macro";
import { FaAngleRight } from "react-icons/fa";
import { useHistory } from "react-router-dom";

// Component of OngoingGoal in Goals page
const OngoingGoal = ({ goal }) => {
  const history = useHistory();

  // Route user to view goal details if user clicked the component
  const onClickHandler = (e) => {
    e.preventDefault();
    history.push(`/goals/${goal._id}`);
  };

  return (
    <div>
      <Wrapper onClick={onClickHandler} data-testid='ongoingGoalButton'>
        <TitleWrapper>
          <Title>{goal.title}</Title>
          <Description>{goal.category}</Description>
          <Description>{goal.period}</Description>
          <Description>
            {/* calculate the days left*/}
            {goal.timespan -
              Math.floor(
                (Date.now() - Date.parse(goal.startTime)) / (1000 * 3600 * 24)
              )}{" "}
            days left
          </Description>
        </TitleWrapper>
        <TimesWrapper>
          <CustomFaAngleRight />
        </TimesWrapper>
      </Wrapper>
    </div>
  );
};

export default OngoingGoal;

const Wrapper = styled.div`
  position: relative;
  background-color: white;
  overflow: hidden;
  border-radius: 20px;
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
  @media (max-width: 991.98px) {
    padding: 20px 20px;
    border-radius: 24px;
  }
`;
const Title = styled.h2`
  position: relative;
  z-index: 10;
  color: var(--primaryShaded);
  font-family: "Roboto";
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 0px;
  line-height: 0.7;
`;
const TimesWrapper = styled.div``;
const TitleWrapper = styled.div``;

const Description = styled.span`
  position: relative;
  z-index: 10;
  color: var(--primaryShaded);
  font-family: "Roboto";
  font-size: 14px;
  font-weight: 500;
  margin-right: 10px;
`;

const CustomFaAngleRight = styled(FaAngleRight)`
  color: --var (primaryShaded);
  width: 25px;
  height: 21px;
  cursor: pointer;
`;
