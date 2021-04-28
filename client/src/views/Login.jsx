import styled from "styled-components/macro";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginImage from "../assets/LogInBack.png";
import Container from "react-bootstrap/Container";
import { FaRegEnvelope } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { useHistory, Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

// Login Page
const Login = ({ setLoading }) => {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [emails, setEmails] = useState({
    email: "",
  });
  const [passwords, setPasswords] = useState({
    password: "",
  });
  const { setAuth } = useContext(AuthContext);
  const history = useHistory();
  // Handle login button
  const Login = (emails, passwords) => {
    // Send a post request with user inputed email and password
    axios
      .post(
        "/user/login",
        { password: passwords, email: emails },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // If user successfully logged in, setAuth to save the user information and redirect to the home page
        setAuth(response.data);
        history.push("/");
        setLoading(true);
      })
      .catch((error) => {
        //If the email / password is wrong, pop up an alert
        alert("Login Failed. Try Again.");
      });
  };

  // Call login function after user clicked the login button
  const submitHandler = (e) => {
    e.preventDefault();
    Login(emails.email, passwords.password);
  };
  // clear the email state
  const clearEmail = (e) => {
    e.preventDefault();
    setEmails({ email: "" });
  };
  // clear the password state
  const clearPassword = (e) => {
    e.preventDefault();
    setPasswords({ password: "" });
  };
  return (
    <Wrapper>
      <Main>
        <ImageBackWrapper>
          <LoginImg src={LoginImage} />
        </ImageBackWrapper>

        <RightWrapper>
          <CustomContainer>
            <Title>Log In</Title>
            <Subtitle>or </Subtitle>
            <SignupLink to="/signup">Sign up </SignupLink>

            <Subtitle> (if you do not have an account) </Subtitle>
            <LoginForm method="POST" onSubmit={submitHandler}>
              <BarWrapper>
                <IconAndTagWrapper>
                  <CustomFaEnvelope />
                  <TagWrapper>
                    <Tag>Email</Tag>
                    <EmailInput
                      id="email"
                      type="email"
                      name="name"
                      placeholder="name@domain.com"
                      onChange={(e) =>
                        setEmails({ ...emails, email: e.target.value })
                      }
                      value={emails.email}
                      required
                    ></EmailInput>
                  </TagWrapper>
                </IconAndTagWrapper>
                <CustomFaTimes onClick={clearEmail} />
              </BarWrapper>
              <PasswordBarWrapper>
                <CustomFiLock />
                <TagWrapper>
                  <Tag>Password</Tag>
                  <PasswordInput
                    id="password"
                    type="password"
                    placeholder="Must have at least 8 characters"
                    onChange={(e) =>
                      setPasswords({ ...passwords, password: e.target.value })
                    }
                    value={passwords.password}
                    required
                  />
                </TagWrapper>
                <CustomFaTimes onClick={clearPassword} />
              </PasswordBarWrapper>
              <LoginBar>
                <LoginTitle>Login</LoginTitle>
              </LoginBar>
            </LoginForm>
          </CustomContainer>
        </RightWrapper>
      </Main>
    </Wrapper>
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
    align-items: center;
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
    padding-top: 40px;
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
  justify-content: space-between;
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
  cursor: pointer;
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

const PasswordBarWrapper = styled.div`
  margin-top: 16px;
  border-radius: 20px;
  border: 2.41px solid var(--primary);
  display: flex;
  align-items: center;
  background-color: #fcfcfc;
  max-width: 481px;
`;

const LoginBar = styled.button`
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

const LoginTitle = styled.h1`
  font-family: "Roboto";
  font-size: 24px;
  font-weight: 700;
  color: white;

  @media (max-width: 767.98px) {
    font-size: 16px;
  }
`;

const LoginForm = styled.form``;

const EmailInput = styled.input`
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

const IconAndTagWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SignupLink = styled(Link)`
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
export default Login;
