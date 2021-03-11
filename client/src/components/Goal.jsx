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
        <TimesWrapper>
          <Times>0/8</Times>
        </TimesWrapper>
      </Wrapper>
    </div>
  );
};

export default Goal;

const Wrapper = styled.div`
  background-color: var(--primary);
  border-radius: 30px;
  padding: 25px 48.95px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  @media (max-width: 991.98px) {
    padding: 20px 20px;
  }
`;
const Title = styled.h2`
  color: #ffffff;
  font-family: "Roboto";
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 0px;

  @media (max-width: 991.98px) {
    font-size: 16px;
  }
`;
const TimesWrapper = styled.div``;
const TitleWrapper = styled.div``;

const Description = styled.span`
  color: #ffffff;
  font-family: "Roboto";
  font-size: 16px;
  font-weight: 500;
  margin-right: 10px;

  @media (max-width: 991.98px) {
    font-size: 14px;
  }
`;

const Times = styled.span`
  color: #ffffff;
  font-family: "Roboto";
  font-size: 18px;
  font-weight: 700;

  @media (max-width: 991.98px) {
    font-size: 16px;
  }
`;
