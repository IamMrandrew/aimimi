import React from "react";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

const Sidebar = ({ xs }) => {
  return (
    <SidebarContainer xs={xs}>
      <h2>Sidebar</h2>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled(Col)``;
