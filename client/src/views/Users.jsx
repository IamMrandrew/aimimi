import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import User from "../components/User";

const Users = () => {
  const [users, setUsers] = useState(null);
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("", { withCredentials: true })
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Wrapper>
      {!loading && (
        <CustomContainer>
          <Title>Users</Title>

          {users &&
            users.map((user) => (
              <User
                key={user._id}
                user={user}
                users={users}
                setUsers={setUsers}
              />
            ))}
        </CustomContainer>
      )}
      {loading && <Loader />}
    </Wrapper>
  );
};

export default Users;

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
  max-width: 888px;
  position: relative;
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

const Subtitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  display: block;
  margin-top: 38px;

  @media (max-width: 991.98px) {
    margin-top: 0px;
  }
`;
