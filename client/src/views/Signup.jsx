import React from "react";
import { GlobalStyle } from "../components/GlobalStyle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginImage from "../assets/LogInBack.png";
import Container from "react-bootstrap/Container";
import { FaRegEnvelope } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import styled from "styled-components/macro";
import { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [img, setImg] = useState(null);
  const history = useHistory();

  const Signup = () => {
    let formdata = new FormData();
    // we will set user email, passwrod, username and img in formdata
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("username", username);
    formdata.append("img", img);
    // we will send a POST request to post the new account details
    axios
      .post("/user/signup", formdata, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        history.push("/email-check");
      })
      .catch((error) => {
        alert("Signup Failed. Try Again.");
      });
  };

  // Handle the clear input button
  const clearEmail = (e) => {
    e.preventDefault();
    setEmail("");
  };
  const clearPassword = (e) => {
    e.preventDefault();
    setPassword("");
  };
  const clearUsername = (e) => {
    e.preventDefault();
    setUsername("");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    Signup();
  };

  // Handle the uploaded file button
  const fileHandler = (e) => {
    setImg(e.target.files[0]);
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Main>
          <ImageBackWrapper>
            <LoginImg src={LoginImage} />
          </ImageBackWrapper>

          <RightWrapper>
            <CustomContainer>
              <Title>Sign Up</Title>
              <Subtitle>or </Subtitle>
              <LoginLink to="/login"> Log In</LoginLink>
              <Subtitle> (if you already have an account) </Subtitle>
              <Signupform
                method="POST"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <BarWrapper>
                  <IconAndTagWrapper>
                    <CustomAiOutlineEye />
                    <TagWrapper>
                      <Tag>Username</Tag>
                      <PasswordInput
                        id="confirm_password"
                        type="username"
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                      />
                    </TagWrapper>
                  </IconAndTagWrapper>

                  <CustomFaTimes onClick={clearUsername} />
                </BarWrapper>

                <PasswordBarWrapper>
                  <IconAndTagWrapper>
                    <CustomFaEnvelope />
                    <TagWrapper>
                      <Tag>Email</Tag>
                      <SigninInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="name@domain.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      ></SigninInput>
                    </TagWrapper>
                  </IconAndTagWrapper>

                  <CustomFaTimes onClick={clearEmail} />
                </PasswordBarWrapper>

                <PasswordBarWrapper>
                  <IconAndTagWrapper>
                    <CustomFiLock />
                    <TagWrapper>
                      <Tag>Password</Tag>
                      <PasswordInput
                        id="password"
                        type="password"
                        placeholder="Must have at least 6 characters"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                      />
                    </TagWrapper>
                  </IconAndTagWrapper>

                  <CustomFaTimes onClick={clearPassword} />
                </PasswordBarWrapper>

                <ChooseFileText>Put your propic here</ChooseFileText>
                <ChooseFileWrapper>
                  <FileUpload type="file" onChange={fileHandler} />
                </ChooseFileWrapper>

                <SignupBar>
                  <SignupTitle>Sign Up</SignupTitle>
                </SignupBar>
              </Signupform>
            </CustomContainer>
          </RightWrapper>
        </Main>
      </Wrapper>
    </>
  );
};

const Wrapper = styled(Row)`
  height: 100vh;
  width: 100%;
  background-color: white;
`;

const Main = styled(Col)`
  background-color: white;
  padding-left: 0;
  padding-right: 0;
  display: flex;
  height: 100%;
  @media (max-width: 991.98px) {
    display: block;
  }
`;
const ImageBackWrapper = styled.div`
  background-color: var(--primary);
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 991.98px) {
    height: 40%;
    width: 100%;
  }
`;

const LoginImg = styled.img`
  max-width: 100%;
  padding-left: 50px;
  padding-right: 50px;

  @media (max-width: 991.98px) {
    max-height: 90%;
  }
`;
const RightWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-family: "Roboto";
  font-size: 38px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 10px;
  @media (max-width: 991.98px) {
    padding-top: 10px;
  }
`;

const CustomContainer = styled(Container)`
  max-width: 481px;
`;

const Subtitle = styled.span`
  font-family: "Roboto";
  font-size: 19px;
  color: #c2c2c2;
  font-weight: 700;

  @media (max-width: 767.98px) {
    font-size: 14px;
  }
`;

const BarWrapper = styled.div`
  margin-top: 45px;
  border-radius: 20px;
  border: 2.41px solid var(--primary);
  display: flex;
  align-items: center;
  background-color: #fcfcfc;
  max-width: 481px;
  @media (max-width: 767.98px) {
    margin-top: 8px;
  }
`;

const CustomFaEnvelope = styled(FaRegEnvelope)`
  width: 29px;
  height: 29px;
  margin: 27px 29px;

  @media (max-width: 767.98px) {
    width: 20px;
    height: 20px;
    margin: 22px 18px;
  }
`;

const CustomFaTimes = styled(FaTimes)`
  width: 20px;
  height: 20px;
  color: #a0a3bd;
  margin-left: auto;
  margin-right: 26px;
`;

const TagWrapper = styled.div`
  width: 100%;
`;

const Tag = styled.h2`
  font-family: "Roboto";
  font-size: 17px;
  font-weight: 400;
  color: #6e7191;
  margin-bottom: 11px;

  @media (max-width: 767.98px) {
    font-size: 14px;
    margin-bottom: 2px;
  }
`;

const CustomFiLock = styled(FiLock)`
  width: 29px;
  height: 29px;
  margin: 27px 29px;

  @media (max-width: 767.98px) {
    width: 24px;
    height: 24px;
    margin: 22px 18px;
  }
`;

const CustomAiOutlineEye = styled(AiOutlineEye)`
  width: 29px;
  height: 29px;
  margin: 27px 29px;

  @media (max-width: 767.98px) {
    width: 24px;
    height: 24px;
    margin: 22px 18px;
  }
`;
const PasswordBarWrapper = styled.div`
  margin-top: 16px;
  border-radius: 20px;
  border: 2.41px solid var(--primary);
  display: flex;
  align-items: center;
  background-color: #fcfcfc;
  max-width: 481px;
`;

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

const LoginLink = styled(Link)`
  font-family: "Roboto";
  font-size: 19px;
  color: #1c4b56;
  font-weight: 700;

  padding-bottom: 0.5px;
  outline: none;

  :hover {
    color: #1c4b56;
  }
`;

const IconAndTagWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Signupform = styled.form``;

const SigninInput = styled.input`
  font-family: "Roboto";
  font-size: 16px;
  font-weight: 400;
  color: black;
  border: none;
  width: 100%;
  outline: none;

  @media (max-width: 767.98px) {
    font-size: 14px;
  }
`;

const PasswordInput = styled.input`
  font-family: "Roboto";
  font-size: 16px;
  font-weight: 400;
  color: black;
  border: none;
  width: 100%;
  outline: none;

  @media (max-width: 767.98px) {
    font-size: 14px;
  }
`;

const ChooseFileWrapper = styled.label`
  display: block;
  border: 2px dashed #777777;
  width: 100%;
  padding: 20px;
  text-align: center;
  cursor: pointer;
`;

const ChooseFileText = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: var(--primaryMild);
  margin-top: 15px;
  margin-bottom: 10px;
`;

const FileUpload = styled.input`
  outline: none;
`;

export default Signup;
