import React, { useState } from "react";
import styled from "styled-components/macro";
import { FaPlus, FaTimes } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import axios from "axios";

const AddGoal = ({ setGoals }) => {
  const [goalName, setGoalName] = useState("");
  const [goalCategory, setGoalCategory] = useState("Sports");
  const [goalPeriod, setGoalPeriod] = useState("Daily");
  const [goalFrequency, setGoalFrequency] = useState("");
  const [goalTimespan, setGoalTimespan] = useState("");
  const [goalPublicity, setGoalPublicity] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const goalNameHandler = (e) => {
    setGoalName(e.target.value);
  };
  const goalCategoryHandler = (e) => {
    setGoalCategory(e.target.value);
  };
  const goalPeriodHandler = (e) => {
    setGoalPeriod(e.target.innerHTML);
  };
  const goalFrequencyHandler = (e) => {
    setGoalFrequency(e.target.value);
  };
  const goalTimespanHandler = (e) => {
    setGoalTimespan(e.target.value);
  };

  const goalPublicityHandler = (e) => {
    setGoalPublicity(!goalPublicity);
  };

  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  const addGoalHandler = () => {
    axios
      .post(
        "/goal",
        {
          title: goalName,
          startTime: Date.now(),
          category: goalCategory,
          frequency: goalFrequency,
          period: goalPeriod,
          publicity: goalPublicity,
          timespan: goalTimespan,
        },
        { withCredentials: true }
      )
      .then((response) => {
        axios.get("/goal", { withCredentials: true }).then((response) => {
          setGoals(response.data);
          setShowModal(!showModal);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <CustomContainer>
        <Wrapper showModal={showModal}>
          <Title>Add Goal</Title>
          <Label>Name</Label>
          <Input
            type="text"
            onChange={goalNameHandler}
            value={goalName}
            placeholder="Goal name"
          />
          <Label>In what category?</Label>
          <Select value={goalCategory} onChange={goalCategoryHandler}>
            <Option value="Sports">Sports</Option>
            <Option value="Lifestyle">Lifestyle</Option>
          </Select>
          <Label>Repeating period?</Label>
          <Button
            selected={goalPeriod === "Daily" ? true : false}
            onClick={goalPeriodHandler}
          >
            Daily
          </Button>
          <Button
            selected={goalPeriod === "Weekly" ? true : false}
            onClick={goalPeriodHandler}
          >
            Weekly
          </Button>
          <Label>How many times?</Label>
          <Input
            type="number"
            onChange={goalFrequencyHandler}
            value={goalFrequency}
            placeholder="1"
          />
          <Label>Last for how long? (days)</Label>
          <Input
            type="number"
            onChange={goalTimespanHandler}
            value={goalTimespan}
            placeholder="21"
          />
          <Field>
            <CheckBox
              type="checkbox"
              onChange={goalPublicityHandler}
              checked={goalPublicity}
            />
            <Label>Shared Goal</Label>
          </Field>
          <SubmitButton onClick={addGoalHandler}>Done</SubmitButton>
        </Wrapper>

        <FloatButton showModal={showModal} onClick={showModalHandler}>
          <FaPlus />
          <FaTimes />
        </FloatButton>
      </CustomContainer>
    </>
  );
};

export default AddGoal;

const Wrapper = styled.div`
  position: absolute;
  bottom: 140px;
  right: 0;
  z-index: 1000;
  min-width: 320px;

  background-color: white;
  padding: 40px 20px;
  border-radius: 12px;
  border: 1px solid #e6e6e6;
  pointer-events: all;
  display: ${(props) => (props.showModal ? "block" : "none")};

  @media (max-width: 575.98px) {
    width: 100%;
  }
`;

const Title = styled.span`
  font-size: 28px;
  font-weight: 700;
  display: block;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
  display: block;
  color: var(--primaryShaded);
`;

const Input = styled.input`
  padding: 8px 20px;
  background-color: var(--background);
  border: none;
  outline: none;
  border-radius: 12px;
  color: var(--monoPrimary);
  font-size: 15px;
  font-weight: 600;
  width: 100%;
  margin-bottom: 12px;

  &::placeholder {
    color: var(--placeholder);
  }
`;

const Select = styled.select`
  padding: 5px 12px;
  padding-right: 15px;
  color: var(--monoPrimary);
  font-weight: 500;
  border: 0px;
  cursor: pointer;
  background-color: var(--background);
  /* appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none; */
  font-size: 16px;
  font-family: inherit;
  &:focus,
  &:hover {
    outline: none;
  }
`;

const Option = styled.option``;

const Button = styled.button`
  padding: 11px 17px;
  background-color: ${(props) =>
    props.selected ? "var(--primaryGoal)" : "var(--background)"};
  border: none;
  outline: none;
  border-radius: 12px;
  font-weight: 500;
  margin-right: 14px;
  color: ${(props) => (props.selected ? "white" : "var(--monoPrimary)")};
`;

const Field = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 20px;
`;

const CheckBox = styled.input`
  padding: 11px 17px;
  background-color: var(--background);
  border: none;
  outline: none;
  border-radius: 12px;
  font-weight: 500;
  margin-right: 14px;
  color: var(--monoPrimary);
`;

const SubmitButton = styled.button`
  padding: 11px 17px;
  background-color: var(--primaryGoal);
  border: none;
  outline: none;
  border-radius: 12px;
  font-weight: 600;
  margin-right: 14px;
  font-size: 18px;
  width: 100%;
  color: white;
`;

const CustomContainer = styled(Container)`
  max-width: 888px;
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 100;
  height: 100vh;
  pointer-events: none;
  transform: translateX(-50%);
`;

const FloatButton = styled.button`
  position: absolute;
  bottom: 60px;
  right: 0;
  z-index: 100;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primaryGoal);
  border: none;
  outline: none;
  border-radius: 50px;
  font-weight: 600;
  margin-right: 14px;
  font-size: 25px;
  color: white;
  pointer-events: all;

  svg:nth-child(1) {
    display: ${(props) => (props.showModal ? "none" : "block")};
  }

  svg:nth-child(2) {
    display: ${(props) => (props.showModal ? "block" : "none")};
  }
`;
