import React from "react";
import styled from "styled-components/macro";

const Goal = ({ goal }) => {
  return (
    <div>
      <Wrapper>
        <TitleWrapper>
          <Title>{goal.title}</Title>
          <Description>{goal.period}</Description>
          <Description>{goal.timespan}</Description>
        </TitleWrapper>
        <TimeWrapper>
          <Scores>0/8</Scores>
        </TimeWrapper>
      </Wrapper>
    </div>
  );
};

export default Goal;

const Wrapper = styled.div`
  background-color: var(--primary);
  height: 94px;
  border-radius: 30px;
  padding: 0 48.95px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
const Title = styled.h2`
  color: #ffffff;
  font-family: "Roboto";
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 0px;
`;
const TimeWrapper = styled.div``;
const TitleWrapper = styled.div``;

const Description = styled.span`
  color: #ffffff;
  font-family: "Roboto";
  font-size: 16px;
  font-weight: 500;
  margin-right: 10px;
`;

const Scores = styled.span`
  color: #ffffff;
  font-family: "Roboto";
  font-size: 18px;
  font-weight: 700;
`;
