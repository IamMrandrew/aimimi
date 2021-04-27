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

//Profile Page
const Profile = () => {
  const history = useHistory();
  const { auth, propic, setPropic, authLoading, setAuthLoading } = useContext(
    AuthContext
  );
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [img, setImg] = useState(null);
  useEffect(() => {
    // Get all onGoning goals of that user, which is a get request
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
    // get all completed goals of user, which is a send request
    axios
      .get("/goal", { withCredentials: true })
      .then((response) => {
        setGoals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setCompleted(auth.completedGoals);
  }, [auth]);

  useEffect(() => {
    //set the completed goal in state and pass the state to other component
    setCompleted(auth.completedGoals);
  }, [auth]);

  const fileHandler = (e) => {
    setImg(e.target.files[0]);
  };

  // Handle onClick delete button
  const DeleteHandler = (e) => {
    // If user click the delete button, will send a delete request and delete whole user account
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

  // Change profile picture function
  const ChangeFile = (e) => {
    // User click the choose profile picture button, and upload a image file to update the profile picture
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("img", img);
    axios
      .post("/user/add_propic", formdata, { withCredentials: true })
      .then((response) => {
        console.log("success");
        setAuthLoading(true);
        axios
          .get(`/user/propic/`, { withCredentials: true })
          .then((response) => {
            setPropic(response.data);
            setAuthLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setAuthLoading(false);
          });
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
          <FlexDivResponsive>
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
                {/* Calculate the number of joined date */}
                <Times>
                  {Math.floor(
                    (Date.now() - Date.parse(auth.joinDate)) /
                      (1000 * 3600 * 24)
                  )}
                </Times>
                <Times> days ago</Times>
              </FlexDiv>
            </BlockDiv>
          </FlexDivResponsive>
          <FlexDivResponsive>
            <Submitform onSubmit={ChangeFile} encType="multipart/form-data">
              <ChooseFileWrapper>
                <FileUpload type="file" onChange={fileHandler} />
              </ChooseFileWrapper>
              <ChangeButton>Change propic</ChangeButton>
            </Submitform>
          </FlexDivResponsive>
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
            {/* used bootstarp framework for the div expense, we use "open" state to control the expand of div*/}
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
              {/* we will map the goal and passes the "goals" state to component <GoalFromProfile> */}
              <div>
                {goals &&
                  goals.map((goal) => (
                    <GoalFromProfile id="ongoing" goal={goal} />
                  ))}
              </div>
            </Collapse>
            {/*  used bootstarp framework for the div expense, we use "open" state to control the expand of div */}
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
              {/* we will map the goal and passes the "goals" state to component <CompletedProfile> */}
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
      </CustomContainer>
    </Wrapper>
  );
};

export default Profile;

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
`;

const InformationWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  border-radius: 20px;
  padding: 25px 28px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
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

const FlexDivResponsive = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 767.98px) {
    margin-top: 20px;
    margin-bottom: 20px;
    flex-basis: 100%;
  }
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

const ChooseFileWrapper = styled.label`
  display: block;
  border: 2px dashed #777777;
  width: 100%;
  padding: 20px;
  text-align: center;
  cursor: pointer;
`;

const FileUpload = styled.input`
  outline: none;
`;

const Submitform = styled.form``;

const ChangeButton = styled.button`
  margin-top: 10px;
  width: 100%;
  border-radius: 14px;
  background-color: var(--primary);
  padding: 8px 12px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  display: block;
  color: white;
  font-weight: 600;

  @media (max-width: 767.98px) {
    height: 70px;
  }
`;
