import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";
import GoalFromProfile from "../components/GoalFromProfile";
import CompletedProfile from "../components/CompletedProfile";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  FaCheckCircle,
  FaBullseye,
  FaAngleDown,
  FaRegCheckSquare,
} from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/Loader";

const Profile = () => {
  const history = useHistory();
  const { auth, propic, authLoading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [img, setImg] = useState(null);
  useEffect(() => {
    axios
      .get("/goal", { withCredentials: true })
      .then((response) => {
        setGoals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/goal", { withCredentials: true })
      .then((response) => {
        setGoals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setCompleted(auth.completedGoals);
    console.log(completed);
  }, []);

  useEffect(() => {
    setCompleted(auth.completedGoals);
    console.log(completed);
  }, [completed]);

  const fileHandler = (e) => {
    setImg(e.target.files[0]);
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
  const ChangeFile = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("img", img);
    axios
      .post("/user/add_propic", formdata, { withCredentials: true })
      .then((response) => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Wrapper>
      <CustomContainer>
        <Title>Profile</Title>
        <InformationWrapper>
          <BlockDiv>
            <Avator>
              {!authLoading && <AvatorImg src={propic} />}
              {authLoading && <Loader />}
            </Avator>
          </BlockDiv>
          <BlockDiv>
            <Name>{auth.username}</Name>
            <Joined>Joined</Joined>
            <FlexDiv>
              <Times>
                {Math.floor(
                  (Date.now() - Date.parse(auth.joinDate)) / (1000 * 3600 * 24)
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
              <div>
                {goals &&
                  goals.map((goal) => (
                    <GoalFromProfile id="ongoing" goal={goal} />
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
              <div>
                {completed &&
                  completed.map((goal) => (
                    <CompletedProfile id="completed" goal={goal} />
                  ))}
              </div>
            </Collapse>
          </HalfBlockDiv>
        </Flex>

        <QuitButton onClick={DeleteHandler}>Delete Account</QuitButton>
        <Submitform onSubmit={ChangeFile} encType="multipart/form-data">
          <FileFlexDiv>
            <UploadText>Want to upload profile picture?</UploadText>
            <FileUpload type="file" onChange={fileHandler} />
          </FileFlexDiv>
          <SignupBar>
            <SignupTitle>Sign Up</SignupTitle>
          </SignupBar>
        </Submitform>
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
const UploadText = styled.span`
  font-weight: 700;
  font-size: 12px;
  color: #1c4b56;
`;
const FileFlexDiv = styled.div`
  display: flex;
`;

const FileUpload = styled.input``;

const Submitform = styled.form``;

const SignupBar = styled.button`
  margin-top: 46px;
  width: 100%;
  border-radius: 20px;
  background-color: var(--primary);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  display: block;

  @media (max-width: 767.98px) {
    height: 70px;
  }
`;

const SignupTitle = styled.h1`
  font-family: "Roboto";
  font-size: 24px;
  font-weight: 700;
  color: white;

  @media (max-width: 767.98px) {
    font-size: 16px;
  }
`;
