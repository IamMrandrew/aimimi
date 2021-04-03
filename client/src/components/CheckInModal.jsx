import React from "react";
import styled from "styled-components/macro";

const CheckInModal = ({ showModal, selectedGoal }) => {
  return (
    <Wrapper showModal={showModal}>
      <Title>Add Progress</Title>
      <Slider type="range" />
      <Button>Check in</Button>
    </Wrapper>
  );
};

export default CheckInModal;

const Wrapper = styled.div`
  opacity: ${(props) => (props.showModal ? "100%" : "0%")};
  pointer-events: ${(props) => (props.showModal ? "all" : "none")};
`;

const Title = styled.span`
  display: block;
`;

const Slider = styled.input``;

const Button = styled.button``;
