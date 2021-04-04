import React from "react";
import styled from "styled-components/macro";
import axios from "axios";

const CheckInModal = ({ showModal, selectedGoal }) => {
  const checkInHandler = () => {
    axios
      .put(
        "/goal/check_in",
        { goal_id: selectedGoal },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Wrapper showModal={showModal}>
      <Title>Add Progress</Title>
      <Slider type="range" />
      <Button onClick={checkInHandler}>Check in</Button>
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
