import React from "react";
import styled from "styled-components/macro";
import { Link, useRouteMatch } from "react-router-dom";

// Each item in the side bar
const NavItem = ({ path, exact, text, showSidebarHandler, children }) => {
  let match = useRouteMatch({ path: path, exact: exact });
  // pass the state inside the return
  return (
    <Wrapper to={path} onClick={showSidebarHandler} data-testid='navItemShowSidebarButton'>
      <Icon>{children}</Icon>
      <Text>{text}</Text>
      <Hover match={match} />
    </Wrapper>
  );
};

export default NavItem;

const Wrapper = styled(Link)`
  max-width: 200px;
  display: flex;
  align-items: baseline;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  position: relative;
  padding: 4px 15px;
  text-decoration: none;

  :hover,
  :focus {
    text-decoration: none;
  }

  @media (max-width: 991.98px) {
    margin-left: 0;
  }

  :hover div {
    opacity: 100%;
    transform: scale(1);
  }
`;

const Icon = styled.span`
  font-size: 24px;
  color: var(--primaryShaded);
  font-weight: 700;
  margin-right: 20px;
  position: relative;
  z-index: 1;
`;

const Text = styled.span`
  font-size: 18px;
  color: var(--primaryShaded);
  font-weight: 700;
  position: relative;
  z-index: 1;
`;

const Hover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  border-radius: 10px;
  opacity: ${(props) => (props.match ? "100%" : "0")};
  background-color: var(--primaryTrans);
  transform: ${(props) => (props.match ? "scale(1)" : "scale(0.5)")};
  transition: all 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
`;
