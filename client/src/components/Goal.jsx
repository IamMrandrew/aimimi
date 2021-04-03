import React, { useState } from "react";
import styled from "styled-components/macro";
import { FaCheck } from "react-icons/fa";

const Goal = ({ goal }) => {
  const [showCheckInButton, setShowCheckInButton] = useState(false);
  const showCheckInButtonHandler = () => {
    setShowCheckInButton((prev) => !prev);
  };

  return (
    <div>
      <HoverWrapper
        onMouseOver={showCheckInButtonHandler}
        onMouseOut={showCheckInButtonHandler}
      >
        <Wrapper showCheckInButton={showCheckInButton}>
          <Progress percentage={goal.progress / goal.frequency}></Progress>
          <TitleWrapper>
            <Title>{goal.title}</Title>
            <Description>{goal.period}</Description>
            <Description>{goal.timespan} days left</Description>
          </TitleWrapper>
          <TimesWrapper>
            <Times>
              {goal.progress}/{goal.frequency}
            </Times>
          </TimesWrapper>
        </Wrapper>
        <CheckInButton showCheckInButton={showCheckInButton}>
          <FaCheck />
        </CheckInButton>
      </HoverWrapper>
    </div>
  );
};

export default Goal;

const HoverWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const CheckInButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  margin-left: 8px;
  width: 65px;
  height: 65px;
  border-radius: 20px;
  border: none;
  background-color: var(--primaryGoal);
  transform: ${(props) => (props.showCheckInButton ? "scale(1)" : "scale(0.6)")}
    translateY(-50%);
  opacity: ${(props) => (props.showCheckInButton ? "100%" : "0%")};
  pointer-events: ${(props) => (props.showCheckInButton ? "all" : "none")};
  transition: opacity 0.2s ease-in, transform 0.2s ease-in;

  svg {
    color: white;
  }
`;

const Wrapper = styled.div`
  position: relative;
  background-color: white;
  overflow: hidden;
  border-radius: 20px;
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => (props.showCheckInButton ? "calc(100% - 75px)" : "100%")};
  transition: width 0.2s ease-in;

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

const Times = styled.span`
  position: relative;
  z-index: 10;
  color: var(--primaryShaded);
  font-family: "Roboto";
  font-size: 16px;
  font-weight: 700;
`;

const Progress = styled.div`
  pointer-events: none;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: var(--primaryGoal);
  opacity: 0.9;
  height: 100%;
  width: 100%;
  transition: all 0.7s cubic-bezier(0.87, 0, 0.11, 1.2);
  clip-path: circle(
    calc(${(props) => props.percentage} * 180%) at calc(0% - 100px) 50%
  ); // circle([size] at [position])
`;
