import React from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Profilephoto from "../assets/ImageLarge.png";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaBullseye, FaAngleRight } from "react-icons/fa";
const Profile = ({ auth }) => {
  const history = useHistory();
  const ClickOngoing = (e) => {
    e.preventDefault();
    history.push("/goals");
  };

  const DeleteHandler = (e) => {
    e.preventDefault();
    axios
      .delete("/user", {
        withCredentials: true,
      })
      .then((response) => {
        alert("Account deleted");
        history.push("/onboarding");
      })
      .catch((err) => {
        alert("Cannot delete account");
      });
  };

  return (
    <Wrapper>
      <CustomContainer>
        <Title>Profile</Title>
        <InformationWrapper>
          <BlockDiv>
            <ProfileImage src={Profilephoto} />
            <Name>{auth.username}</Name>
          </BlockDiv>
          <FlexDiv>
            <Line />
            <BlockDiv>
              <Joined>Joined</Joined>
              <FlexDiv>
                <Times>
                  {Math.floor(
                    (Date.now() - Date.parse(auth.joinDate)) /
                      (1000 * 3600 * 24)
                  )}
                </Times>
                <DaysAgo> days ago</DaysAgo>
              </FlexDiv>
            </BlockDiv>
          </FlexDiv>
        </InformationWrapper>

        <Flex>
          <ItemWrapper>
            <CustomContainer1>
              <ItemDiv>
                <ItemText>
                  <FaCheckCircle />
                </ItemText>
              </ItemDiv>
              <Status>{auth.completedGoals.length}</Status>
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
              <Status>{auth.onGoingGoals.length}</Status>
              <GoalTitle>Ongoing</GoalTitle>
            </CustomContainer1>
          </SecondItemWrapper>
        </Flex>

        <GoalsDiv onClick={ClickOngoing}>
          <GoalsTitleDiv>
            <SecondItemTextDiv>
              <FaBullseye />
            </SecondItemTextDiv>
            <GoalsTitle>Ongoing Goals</GoalsTitle>
          </GoalsTitleDiv>
          <Angleright>
            <FaAngleRight />
          </Angleright>
        </GoalsDiv>
        <QuitButton onClick={DeleteHandler}>Delete Account</QuitButton>
      </CustomContainer>
    </Wrapper>
  );
};

export default Profile;

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
  height: 200px;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 45px;
  border-radius: 20px;

  @media (max-width: 768px) {
    height: 130px;
    margin-top: 15px;
  }
`;

const BlockDiv = styled.div`
  margin-left: 82px;
  @media (max-width: 768px) {
    margin-left: 27px;
  }
`;

const ProfileImage = styled.img`
  border-radius: 18px;
  width: 100px;
  height: 100px;
  @media (max-width: 768.98px) {
    width: 70px;
    height: 70px;
  }
`;
const Name = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: #1c4b56;
  margin-top: 5px;
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;
const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Line = styled.div`
  border-left: 1px solid #f3f3f3;
  height: 182px;
  @media (max-width: 768px) {
    height: 82px;
  }
`;

const Joined = styled.span`
  font-size: 30px;
  font-weight: 700;
  color: var(--primaryTinted);

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Status = styled.h1`
  color: #1c4b56;
  font-weight: 700;
  font-size: 50px;
  @media (max-width: 991.98px) {
    font-size: 30px;
  }
`;

const Times = styled.h1`
  color: #1c4b56;
  font-weight: 700;
  font-size: 50px;
  margin-right: 5px;
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;
const DaysAgo = styled.span`
  font-size: 40px;
  font-weight: 400;
  color: #1c4b56;
  margin-right: 82px;
  @media (max-width: 768px) {
    font-size: 20px;
    margin-right: 14px;
  }
`;
const ItemDiv = styled.div`
  background-color: #a3d2e6;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90.25px;
  height: 83.43px;
  margin-bottom: 9px;
  @media (max-width: 991.98px) {
    width: 50px;
    height: 50px;
  }
`;

const ItemText = styled.span`
  color: #ffffff;
  font-size: 50px;
  @media (max-width: 991.98px) {
    font-size: 36px;
  }
`;

const ItemWrapper = styled.div`
  background-color: #edf7fa;
  height: 287px;
  width: 50%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-top: 53px;
  @media (max-width: 991.98px) {
    height: 172px;
    margin-top: 37px;
  }
`;

const GoalTitle = styled.span`
  color: #777777;
  font-size: 30px;
  font-weight: 400px;
  @media (max-width: 991.98px) {
    font-size: 18px;
  }
`;

const CustomContainer1 = styled.div`
  margin-left: 30px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SecondItemWrapper = styled.div`
  background-color: #fceee6;
  height: 287px;
  width: 50%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-top: 53px;
  margin-left: 15px;
  @media (max-width: 991.98px) {
    height: 172px;
    margin-top: 37px;
  }
`;

const SecondItemDiv = styled.div`
  background-color: #e87e45;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90.25px;
  height: 83.43px;
  margin-bottom: 9px;
  @media (max-width: 991.98px) {
    width: 50px;
    height: 50px;
  }
`;

const GoalsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  height: 71px;
  border-radius: 20px;
  margin-top: 23px;
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
  margin-left: 25px;
`;

const Angleright = styled.span`
  font-size: 18px;
  color: #1c4b56;
  margin-right: 27px;
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
  width: 100%;
  border: none;
  margin-top: 36px;
`;
