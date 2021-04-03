import React from "react";
import styled from "styled-components/macro";
import { FaAngleRight } from "react-icons/fa";

const OngoingGoal = () => {
  return (
    <div>
      <Wrapper>
        <TitleWrapper>
          <Title>Drink Water</Title>
          <Description>Everyday</Description>
          <Description> days left</Description>
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

const CustomFaAngleRight = styled(FaAngleRight)`
  color: --var (primaryShaded);
  width: 25px;
  height: 21px;
  cursor: pointer;
`;
