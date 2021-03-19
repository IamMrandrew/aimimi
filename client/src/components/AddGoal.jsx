import React, { useState } from "react";
import styled from "styled-components/macro";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const AddGoal = ({ setGoals }) => {
  const [goalName, setGoalName] = useState("");
  const [goalCategory, setGoalCategory] = useState("Lifestyle");
  const [goalPeriod, setGoalPeriod] = useState("Everyday");
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
    setGoalPeriod(e.target.value);
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
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
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
        <Select>
          <Option>Sports</Option>
          <Option>Lifestyle</Option>
        </Select>
        <Label>Repeating period?</Label>
        <Button>Everyday</Button>
        <Button>Weekly</Button>
        <Label>How many times?</Label>
        <Input
          type="number"
          onChange={goalFrequencyHandler}
          value={goalFrequency}
          placeholder="1"
        />
        <Label>Last for how long?</Label>
        <Input
          type="number"
          onChange={goalTimespanHandler}
          value={goalTimespan}
          placeholder="3"
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
      <FloatButton onClick={showModalHandler}>
        <FaPlus />
      </FloatButton>
    </>
  );
};

export default AddGoal;

const Wrapper = styled.div`
  position: absolute;
  bottom: 140px;
  right: 0;
  z-index: 1000;
  min-width: 350px;

  background-color: white;
  padding: 40px 20px;
  border-radius: 12px;
  border: 1px solid #e6e6e6;

  display: ${(props) => (props.showModal ? "block" : "none")};
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

const Select = styled.select``;

const Option = styled.option``;

const Button = styled.button`
  padding: 11px 17px;
  background-color: var(--background);
  border: none;
  outline: none;
  border-radius: 12px;
  font-weight: 500;
  margin-right: 14px;
  color: var(--monoPrimary);
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

const FloatButton = styled.button`
  position: absolute;
  bottom: 60px;
  right: 0;
  z-index: 100;
  padding: 11px 17px;
  background-color: var(--primaryGoal);
  border: none;
  outline: none;
  border-radius: 50px;
  font-weight: 600;
  margin-right: 14px;
  font-size: 25px;
  color: white;
`;
