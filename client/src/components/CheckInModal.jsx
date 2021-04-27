import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/macro";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

// Checkin Model for onGoing goals in Today page
const CheckInModal = ({
  showModal,
  setShowModal,
  selectedGoal,
  selectedGoalCheckIn,
}) => {
  const [progress, setProgress] = useState(0);
  const [showValue, setShowValue] = useState(false);

  const { setAuth } = useContext(AuthContext);

  // For user to check in the goal
  const checkInHandler = () => {
    // Put the new progress with corresponding goal._id
    axios
      .put(
        "/goal/check_in",
        { goal_id: selectedGoal._id, check_in_time: progress },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);

        // Update user onGoingGoals for auth state
        axios
          .get("/user", { withCredentials: true })
          .then((response) => {
            setAuth(response.data);
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });
        setShowModal(!showModal);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Set the progess bar value in progress state
  const progressHandler = (e) => {
    setProgress(e.target.value);
    setShowValue(true);
  };

  // Set the progress state
  useEffect(() => {
    setProgress(selectedGoalCheckIn);
  }, [selectedGoal, selectedGoalCheckIn]);

  return (
    <Wrapper showModal={showModal}>
      <Card showModal={showModal}>
        <Title>Add Progress</Title>
        <SliderField>
          <Number>0</Number>
          <SliderWrapper>
            <SliderValue
              showValue={showValue}
              selectedGoal={selectedGoal}
              progress={progress}
            >
              {progress}
            </SliderValue>
            <Slider
              onChange={progressHandler}
              onBlur={() => setShowValue(false)}
              type="range"
              value={progress}
              min="0"
              max={selectedGoal.frequency}
              selectedGoal={selectedGoal}
              progress={progress}
              data-testid="checkInProgress"
            />
          </SliderWrapper>
          <Number>{selectedGoal.frequency}</Number>
        </SliderField>
        <Button onClick={checkInHandler} data-testid="checkInButton">
          Check in
        </Button>
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
  margin-bottom: 30px;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
`;

const SliderField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Slider = styled.input`
  width: 100%;
  height: 10px;
  border-radius: 13px;
  appearance: none;
  --webkit-appearance: none;
  outline: none;
  border: none;
  background: ${(props) =>
    "linear-gradient(90deg,var(--primaryGoal)" +
    (props.progress / props.selectedGoal.frequency) * 100 +
    "%,#eeeeee " +
    (props.progress / props.selectedGoal.frequency) * 100 +
    "%)"};

  ::-webkit-slider-thumb {
    appearance: none;
    --webkit-appearance: none;
    height: 20px;
    width: 20px;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  }
`;

const SliderValue = styled.span`
  position: absolute;
  top: -40px;
  left: ${(props) =>
    (props.progress / props.selectedGoal.frequency) * 100 > 50
      ? (props.progress / props.selectedGoal.frequency) * 100 - 3
      : (props.progress / props.selectedGoal.frequency) * 100 === 50
      ? (props.progress / props.selectedGoal.frequency) * 100
      : (props.progress / props.selectedGoal.frequency) * 100 + 3}%;
  transform: translateX(-50%)
    ${(props) => (props.showValue ? "scale(1)" : "scale(0.5)")};
  transform-origin: bottom;
  opacity: ${(props) => (props.showValue ? "100%" : "0%")};
  font-size: 16px;
  font-weight: 600;
  color: white;
  transition: all 200ms cubic-bezier(0.18, 0.89, 0.43, 1.19);

  ::after {
    content: "";
    display: block;
    position: absolute;
    top: -6px;
    left: 50%;
    width: 35px;
    height: 35px;
    z-index: -1;
    background-color: var(--primaryGoal);
    transform: translateX(-50%) rotate(45deg);
    border-radius: 50% 50% 0 50%;
  }
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
