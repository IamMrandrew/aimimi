import React, { useContext, useState } from "react";
import styled from "styled-components/macro";
import { FaPlus, FaAngleDown } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

// Add button in today and goals page
const AddGoal = ({ setGoals }) => {
  const [goalName, setGoalName] = useState("");
  const [goalCategory, setGoalCategory] = useState("Sports");
  const [goalPeriod, setGoalPeriod] = useState("Daily");
  const [goalFrequency, setGoalFrequency] = useState("");
  const [goalTimespan, setGoalTimespan] = useState("");
  const [goalPublicity, setGoalPublicity] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { setAuth } = useContext(AuthContext);

  // set user inputed name in goalName state
  const goalNameHandler = (e) => {
    setGoalName(e.target.value);
  };
  // set user inputed category in goalCategory state
  const goalCategoryHandler = (e) => {
    setGoalCategory(e.target.value);
  };
  // set user inputed goal period in goalPeriod state
  const goalPeriodHandler = (e) => {
    setGoalPeriod(e.target.innerHTML);
  };
  // set user inputed frequency in goalFrequency state
  const goalFrequencyHandler = (e) => {
    setGoalFrequency(e.target.value);
  };
  // set user inputed timespan in goalTimespan state
  const goalTimespanHandler = (e) => {
    setGoalTimespan(e.target.value);
  };
  // set user inputed publicity in goalPublicity state
  const goalPublicityHandler = (e) => {
    setGoalPublicity(!goalPublicity);
  };
  //Control the model
  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  // Add goal function
  const addGoalHandler = () => {
    // Post the goal with the title, startTime, category, frequency, period, publicity, timespan
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
            data-testid="goalName"
          />
          <Label>In what category?</Label>
          <SelectBoxWrapper>
            <Select
              value={goalCategory}
              onChange={goalCategoryHandler}
              data-testid="goalCategory"
            >
              <Option value="Sports">Sports</Option>
              <Option value="Lifestyle">Lifestyle</Option>
              <Option value="Financial">Financial</Option>
              <Option value="Spiritual">Spiritual</Option>
            </Select>
            <FaAngleDown />
          </SelectBoxWrapper>
          <Label>Repeating period?</Label>
          <Button
            selected={goalPeriod === "Daily" ? true : false}
            onClick={goalPeriodHandler}
            data-testid="goalPeriod_daily"
          >
            Daily
          </Button>
          <Button
            selected={goalPeriod === "Weekly" ? true : false}
            onClick={goalPeriodHandler}
            data-testid="goalPeriod_weekly"
          >
            Weekly
          </Button>
          <Label>How many times?</Label>
          <Input
            type="number"
            onChange={goalFrequencyHandler}
            value={goalFrequency}
            placeholder="1"
            data-testid="goalFrequency"
          />
          <Label>Last for how long? (days)</Label>
          <Input
            type="number"
            onChange={goalTimespanHandler}
            value={goalTimespan}
            placeholder="21"
            data-testid="goalTimespan"
          />
          <Field>
            <CheckBox
              type="checkbox"
              onChange={goalPublicityHandler}
              checked={goalPublicity}
              data-testid="goalPublicity"
            />
            <Label>Shared Goal</Label>
          </Field>
          <SubmitButton
            onClick={addGoalHandler}
            data-testid="addGoalSubmitButton"
          >
            Done
          </SubmitButton>
        </Wrapper>

        <FloatButton
          showModal={showModal}
          onClick={showModalHandler}
          data-testid="showModalButton"
        >
          <FaPlus />
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
  pointer-events: ${(props) => (props.showModal ? "all" : "none")};
  /* display: ${(props) => (props.showModal ? "block" : "none")}; */
  opacity: ${(props) => (props.showModal ? "100%" : "0")};
  transform: ${(props) => (props.showModal ? "scale(1)" : "scale(0.75)")};
  transition: all 300ms cubic-bezier(0.87, 0, 0.11, 1.2);

  @media (max-width: 575.98px) {
    right: 50%;
    transform: ${(props) =>
      props.showModal
        ? "translateX(50%) scale(1)"
        : "translateX(50%) scale(0.75)"};
    width: 95%;
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

const SelectBoxWrapper = styled.div`
  position: relative;
  cursor: pointer;
  margin-right: 10px;
  background-color: var(--background);
  border-radius: 12px;
  max-width: 120px;

  svg {
    width: 20px;
    height: 20px;
    color: var(--monoPrimary);
    pointer-events: none;
    position: absolute;
    top: 6px;
    right: 15px;
  }
`;

const Select = styled.select`
  padding: 5px 12px;
  padding-right: 15px;
  color: var(--monoPrimary);
  background: none;
  font-weight: 500;
  border: 0px;
  cursor: pointer;
  appearance: none;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
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
  align-items: top;
  margin-bottom: 20px;
`;

const CheckBox = styled.input`
  position: relative;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background-color: red;
  background-color: var(--background);
  border-radius: 5px;
  appearance: none;
  outline: 0;
  cursor: pointer;
  transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);

  &::before {
    position: absolute;
    content: "";
    display: block;
    top: 4px;
    left: 9px;
    width: 8px;
    height: 14px;
    border-style: solid;
    border-color: white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    opacity: 0;
  }

  &:checked {
    color: white;
    background: var(--primaryGoal);

    &::before {
      opacity: 1;
    }
  }
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
  color: white;
  pointer-events: all;
  transform: ${(props) => (props.showModal ? "scale(1.15)" : "scale(1)")};
  transition: all 400ms cubic-bezier(0.87, 0, 0.11, 1.2);

  svg {
    height: 25px;
    width: 25px;
    transform: ${(props) => (props.showModal ? "rotate(135deg)" : "rotate(0)")};
    transition: all 400ms cubic-bezier(0.87, 0, 0.11, 1.2);
  }
`;
