import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";
import GoalFromProfile from "../components/GoalFromProfile";
import CompletedProfile from "../components/CompletedProfile";
import { useHistory, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaCheckCircle,
  FaBullseye,
  FaAngleDown,
  FaRegCheckSquare,
} from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import OtherUserGoal from "../components/OtherUserGoal";
import OngoingGoal from "../components/OngoingGoal";

// Profile of other user
const OtherProfile = () => {
  let { id } = useParams();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const { auth, propic, authLoading } = useContext(AuthContext);

  const [completed, setCompleted] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [onGoing, setOnGoing] = useState([]);
  const [loading, setLoading] = useState(true);

  const [hisPropic, setHisPropic] = useState(null);
  const [propicLoading, setPropicLoading] = useState(true);

  useEffect(() => {
    // get other user information using get request, id in parmas is the user id
    // set the user information to states inorder to clearly separate the basic info, ongoing goals and completed goals
    axios
      .get(`/user/other_user/${id}`, { withCredentials: true })
      .then((res) => {
        setUserInfo(res.data);
        setOnGoing(res.data.onGoingGoals);
        setCompleted(res.data.completedGoals);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // get other user profile picture using get request, id in parmas is the user id
    axios
      .get(`/user/propic/${id}`, { withCredentials: true })
      .then((response) => {
        setHisPropic(response.data);
        setPropicLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Wrapper>
      <CustomContainer>
        <Title>Profile</Title>
        <InformationWrapper>
          <BlockDiv>
            <Avator>
              {!propicLoading && <AvatorImg src={hisPropic} />}
              {propicLoading && <Loader />}
            </Avator>
          </BlockDiv>
          <BlockDiv>
            <Name>{userInfo.username}</Name>
            <Joined>Joined</Joined>
            <FlexDiv>
              {/* calculate the joined time */}
              <Times>
                {Math.floor(
                  (Date.now() - Date.parse(userInfo.joinDate)) /
                    (1000 * 3600 * 24)
                )}
              </Times>
              <Times> days ago</Times>
            </FlexDiv>
          </BlockDiv>
        </InformationWrapper>

        <Flex>
          <HalfFlexDiv>
            <ItemWrapper>
              <CustomContainer1>
                <ItemDiv>
                  <ItemText>
                    <FaCheckCircle />
                  </ItemText>
                </ItemDiv>
                <Status>
                  {/* set condition to avoid empty response of user's completedGoals */}
                  {userInfo.completedGoals
                    ? userInfo.completedGoals.length
                    : ""}
                </Status>
                <GoalTitle>Compelted</GoalTitle>
              </CustomContainer1>
            </ItemWrapper>

            <SecondItemWrapper>
              <CustomContainer1>
                <SecondItemDiv>
                  <ItemText>
                    <FaBullseye />
                  </ItemText>
                </SecondItemDiv>
                {/* set condition to avoid empty response of user's onGoingGoals */}
                <Status>
                  {userInfo.onGoingGoals ? userInfo.onGoingGoals.length : ""}
                </Status>
                <GoalTitle>Ongoing</GoalTitle>
              </CustomContainer1>
            </SecondItemWrapper>
          </HalfFlexDiv>

          <HalfBlockDiv>
            <GoalsDiv
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="ongoing"
            >
              <GoalsTitleDiv>
                <SecondItemTextDiv>
                  <FaBullseye />
                </SecondItemTextDiv>
                <GoalsTitle>Ongoing Goals</GoalsTitle>
              </GoalsTitleDiv>
              <Angleright>
                <FaAngleDown />
              </Angleright>
            </GoalsDiv>
            <Collapse in={open}>
              {/* map all user's onGoing goal and pass the "onGoing" to component <OtherUserGoal>*/}
              <div>
                {onGoing &&
                  onGoing.map((goal) => (
                    <OtherUserGoal id="ongoing" goal={goal} type={"onGoing"} />
                  ))}
              </div>
            </Collapse>

            <GoalsDiv
              onClick={() => setSecondOpen(!secondOpen)}
              aria-expanded={secondOpen}
              aria-controls="completed"
            >
              <GoalsTitleDiv>
                <ItemTextDiv>
                  <FaRegCheckSquare />
                </ItemTextDiv>
                <GoalsTitle>Completed Goals</GoalsTitle>
              </GoalsTitleDiv>
              <Angleright>
                <FaAngleDown />
              </Angleright>
            </GoalsDiv>
            <Collapse in={secondOpen}>
              {/* map all user's completed goal and pass the "completed" to component <OtherUserGoal>*/}
              <div>
                {completed &&
                  completed.map((goal) => (
                    <OtherUserGoal id="completed" goal={goal} />
                  ))}
              </div>
            </Collapse>
          </HalfBlockDiv>
        </Flex>
      </CustomContainer>
    </Wrapper>
  );
};

export default OtherProfile;

const Wrapper = styled.div`
  padding-top: 32px;
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--primaryShaded);
  margin-bottom: 30px;

  @media (max-width: 991.98px) {
    display: none;
  }
`;

const CustomContainer = styled(Container)`
  max-width: 888px;
  position: relative;
`;

const InformationWrapper = styled.div`
  height: 152px;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  margin-top: 32px;
  border-radius: 20px;
  padding: 25px 28px;
  @media (max-width: 768px) {
    height: 130px;
    margin-top: 15px;
  }
`;

const BlockDiv = styled.div``;

const Avator = styled.div`
  margin-right: 62px;
  border-radius: 18px;
  width: 100px;
  height: 100px;
  overflow: hidden;

  & > div {
    height: 100%;
  }

  span {
    border-color: var(--primaryGoal);
  }
`;

const AvatorImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
`;

const Name = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 20px;
`;
const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Joined = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: var(--primaryTinted);
`;

const Status = styled.h1`
  color: #1c4b56;
  font-weight: 700;
  font-size: 24px;
`;

const Times = styled.h1`
  color: #1c4b56;
  font-weight: 700;
  font-size: 16px;
  margin-right: 5px;
`;

const ItemDiv = styled.div`
  background-color: #a3d2e6;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-bottom: 16px;
`;

const ItemText = styled.span`
  color: #ffffff;
  font-size: 32px;
`;

const ItemWrapper = styled.div`
  background-color: #edf7fa;
  height: 172px;
  width: 200px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-right: 17px;
  @media (max-width: 768px) {
    width: 50%;
  }
`;

const GoalTitle = styled.span`
  color: #777777;
  font-size: 16px;
  font-weight: 400px;
`;

const CustomContainer1 = styled.div`
  margin-left: 30px;
`;

const Flex = styled.div`
  display: flex;
  padding-top: 20px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const SecondItemWrapper = styled.div`
  background-color: #fceee6;
  height: 172px;
  width: 200px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  @media (max-width: 768px) {
    width: 50%;
  }
`;

const SecondItemDiv = styled.div`
  background-color: #e87e45;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-bottom: 16px;
`;

const GoalsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  height: 58px;
  width: 100%;
  border-radius: 20px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const GoalsTitleDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 35px;
`;

const GoalsTitle = styled.div`
  color: #000000;
  font-weight: 700;
  font-size: 18px;
  margin-left: 27px;
`;

const Angleright = styled.span`
  font-size: 18px;
  color: #1c4b56;
  margin-right: 13px;
`;

const SecondItemTextDiv = styled.span`
  color: #e87e45;
  font-size: 30px;
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
  width: 50%;
  border: none;
  margin-top: 36px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HalfBlockDiv = styled.div`
  width: 50%;
  padding-left: 30px;
  @media (max-width: 768px) {
    width: 100%;
    padding-left: 0px;
    margin-top: 20px;
  }
`;
const HalfFlexDiv = styled.div`
  display: flex;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ItemTextDiv = styled.div`
  color: #a3d2e6;
  font-size: 30px;
`;
