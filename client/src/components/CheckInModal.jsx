import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import axios from "axios";

const CheckInModal = ({ showModal, setShowModal, selectedGoal }) => {
  const [progress, setProgress] = useState(0);

  const checkInHandler = () => {
    axios
      .put(
        "/goal/check_in",
        { goal_id: selectedGoal._id, progress: progress },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    setShowModal(!showModal);
  };

  const progressHandler = (e) => {
    setProgress(e.target.value);
  };

  useEffect(() => {
    console.log(progress);
  }, []);

  return (
    <Wrapper showModal={showModal}>
      <Card showModal={showModal}>
        <Title>Add Progress</Title>
        <SliderWrapper>
          <Number>0</Number>
          <Slider
            onChange={progressHandler}
            type="range"
            value={progress}
            min="0"
            max={selectedGoal.frequency}
          />
          <Number>{selectedGoal.frequency}</Number>
        </SliderWrapper>
        <Button onClick={checkInHandler}>Check in</Button>
      </Card>
    </Wrapper>
  );
};

export default CheckInModal;

const Wrapper = styled.div`
  position: absolute;
  bottom: 50%;
  left: 50%;
  z-index: 1000;
  width: 100%;
  transform: translate(-50%, 50%);
  padding: 20px;
  opacity: ${(props) => (props.showModal ? "100%" : "0%")};
  pointer-events: none;
  transition: all 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);

  @media (max-width: 767.99px) {
    bottom: 30px;
    transform: ${(props) =>
      props.showModal ? "translate(-50%)" : "translate(-50%, 100%)"};
  }
`;

const Card = styled.div`
  max-width: 370px;
  background-color: white;
  border-radius: 24px;
  padding: 40px;
  margin-left: auto;
  margin-right: auto;
  pointer-events: ${(props) => (props.showModal ? "all" : "none")};
`;

const Title = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 25px;
`;

const Slider = styled.input`
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Number = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 11px 17px;
  background-color: var(--primaryGoal);
  border: none;
  outline: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  margin-right: 14px;
  color: white;
`;
