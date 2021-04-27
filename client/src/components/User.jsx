import React from "react";
import styled from "styled-components/macro";
import axios from "axios";

const User = ({ user, users, setUsers }) => {
  const deleteGoalHandler = () => {
    axios
      .delete(`/user/${user._id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setUsers(users.filter((item) => item._id !== user._id));
  };

  return (
    <Wrapper>
      <TextWrapper>
        <Name>{user.username}</Name>
        <Email>{user.email}</Email>
      </TextWrapper>
      <DeleteButton onClick={deleteGoalHandler} data-testid='deleteUserButton'>Delete</DeleteButton>
    </Wrapper>
  );
};

export default User;

const Wrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-top: 15px;
  display: flex;
  align-items: top;
  justify-content: space-between;
`;

const TextWrapper = styled.div``;

const Name = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 500;
`;

const Email = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 400;
`;

const DeleteButton = styled.button`
  margin-left: 12px;
  padding: 4px 20px;
  display: block;
  align-items: center;
  justify-content: space-between;
  border: none;
  border-radius: 14px;
  background-color: #f28f8f;
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
`;
