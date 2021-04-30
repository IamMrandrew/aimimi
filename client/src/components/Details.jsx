import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import { FaAngleLeft, FaClipboardCheck, FaFire } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

// Show the details of the goal in Goals page
const Details = ({ goals, setGoals }) => {
  const { id } = useParams();
  const history = useHistory();
  const { auth, setAuth } = useContext(AuthContext);
  const [goal, setGoal] = useState({});
  const [userGoal, setUserGoal] = useState([]);

  // Set the goals in Goals state
  useEffect(() => {
    setGoal(goals.find((goal) => goal._id === id));
  }, [id, goals]);

  // Set the the details of the goal in userGoal state
  useEffect(() => {
    if (auth.onGoingGoals) {
      if (auth.onGoingGoals.length > 0) {
        setUserGoal(
          auth.onGoingGoals.find((item) => item.goal_id === goal._id)
        );
      }
    }
  }, [goal, auth, id]);

  // Route user to goals page
  const backGoalsHandler = (e) => {
    e.preventDefault();
    history.push(`/goals`);
  };

  // Detele the goals from user onGoingGoals
  const onClickDeleteHandler = () => {
    // Quit the goal by sending a delete request with goal._id as parameters
    axios
      .delete(`/goal/quit/${goal._id}`, {
        withCredentials: true,
      })
      .then((response) => {
        alert("Quit successfully!");
        setGoals(goals.filter((element) => element.id !== goal.id));

        // Update user onGoingGoals for auth state
        axios
          .get("/user", { withCredentials: true })
          .then((response) => {
            setAuth(response.data);
          })
          .catch((error) => {
            console.log(error.response.data.message);
          });

        history.push("/goals");
      })
      .catch((error) => {
        alert("Delete Failed. Try Again.");
      });
  };

  return (
    <Wrapper>
      <CustomContainer>
        <LeftButtonWrapper onClick={backGoalsHandler}>
          <CustomFaAngleLeft />
        </LeftButtonWrapper>
        <HeadingWrapper>
          <TitleWrapper>
            <Title> {goal.title} </Title>
            <Description>{goal.category}</Description>
            <Description>{goal.period}</Description>
            <Description>
              {goals.length > 0 &&
                goal.timespan -
                  Math.floor(
                    (Date.now() - Date.parse(goal.startTime)) /
                      (1000 * 3600 * 24)
                  )}{" "}
              days left
            </Description>
          </TitleWrapper>
        </HeadingWrapper>

        <ContentWrapper>
          <DetailsWrapper>
            <EmptyDiv>
              <DeatilTitle>How well you did?</DeatilTitle>
              <PercentageDiv>
                <Number>{userGoal && Math.round(userGoal.accuracy)}%</Number>
                <ItemIcon>
                  <FaClipboardCheck />
                </ItemIcon>
              </PercentageDiv>
              <Status>success</Status>
            </EmptyDiv>
          </DetailsWrapper>
          <DetailsWrapper>
            <EmptyDiv>
              <DeatilTitle>How long did you lasted for?</DeatilTitle>
              <PercentageDiv>
                <Number>
                  {userGoal && userGoal.check_in_successful_time} days
                </Number>
                <ItemIcon>
                  <FaFire />
                </ItemIcon>
              </PercentageDiv>
              <Status>streaks</Status>
            </EmptyDiv>
          </DetailsWrapper>
          <LastWrapper>
            <EmptyDiv>
              <DeatilTitle>How long did you lasted for?</DeatilTitle>
              <PercentageDiv>
                <PastDay>
                  {Math.floor(
                    (Date.now() - Date.parse(userGoal && userGoal.join_time)) /
                      (1000 * 3600 * 24)
                  )}{" "}
                  day passed
                </PastDay>
              </PercentageDiv>
              <CustomProgressbar
                now={Math.floor(
                  (Date.now() - Date.parse(userGoal && userGoal.join_time)) /
                    (1000 * 3600 * 24)
                )}
                max={`${goal.timespan}`}
                variant="info"
              />
              <LabelDiv>
                <Label>0</Label>
                <Label>{goal.timespan}</Label>
              </LabelDiv>
            </EmptyDiv>
          </LastWrapper>
        </ContentWrapper>
        <QuitButton onClick={onClickDeleteHandler}>Quit goal</QuitButton>
      </CustomContainer>
    </Wrapper>
  );
};

export default Details;
const Wrapper = styled.div`
  padding-top: 32px;
  flex: 1;
  display: flex;
  overflow: scroll;
  height: calc(100vh - 60px);

  @media (min-width: 992px) {
    height: calc(100vh - 80px);
  }
`;
const CustomContainer = styled(Container)`
  margin-top: 33px;
`;

const LeftButtonWrapper = styled.div`
  background-color: #f2f4f6;
  width: 44px;
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-bottom: 21px;
  cursor: pointer;
`;

const CustomFaAngleLeft = styled(FaAngleLeft)`
  color: #202020;
  height: 18px;
  width: 10px;
`;

const HeadingWrapper = styled.div`
  position: relative;
  background-color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  height: 131px;
  max-width: 100%;
`;
const Title = styled.h2`
  position: relative;
  z-index: 10;
  color: var(--primaryShaded);
  font-family: "Roboto";
  font-size: 24px;
  font-weight: 700;
`;
const TitleWrapper = styled.div`
  margin-left: 20px;
`;

const Description = styled.span`
  position: relative;
  z-index: 10;
  color: #759198;
  font-family: "Roboto";
  font-size: 14px;
  font-weight: 500;
  margin-right: 10px;
`;

const ContentWrapper = styled.div`
  margin-top: 22px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: block;
  }
`;

const DetailsWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  height: 177px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
  margin-right: 19px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const DeatilTitle = styled.h2`
  font-family: "Roboto";
  font-size: 17px;
  font-weight: 700px;
`;

const PercentageDiv = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
`;
const Number = styled.h2`
  color: var(--primaryMild);
  font-size: 24px;
  font-weight: 700;
  font-family: "Roboto";
`;

const ItemIcon = styled.span`
  font-size: 30px;
  color: var(--primaryMild);
  font-weight: 700;
  margin-right: 51px;
  padding-bottom: 1px;
  @media (max-width: 1035px) {
    padding-bottom: 10px;
  }
`;

const Status = styled.span`
  color: #959595;
  font-size: 16px;
  font-family: "Roboto";
  font-weight: 400;
`;

const EmptyDiv = styled.div`
  width: 100%;
`;

const LastWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  height: 177px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const PastDay = styled.h2`
  font-size: 16px;
  color: var(--primaryMild);
  font-weight: 700;
  font-family: "Roboto";
  margin-top: 6px;
`;

const CustomProgressbar = styled(ProgressBar)`
  .custom {
    color: var(--primaryMild);
  }
  margin-right: 28.5px;
`;

const Label = styled.span`
  color: #999999;
  font-size: 15px;
  font-weight: 400;
  font-family: "Roboto";
  margin-right: 28.5px;
`;
const LabelDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const QuitButton = styled.button`
  border-radius: 20px;
  display: flex;
  background-color: #f28f8f;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  height: 54px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: 100%;
  border: none;
  margin-top: 36px;
`;
