import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import Today from "./components/Today";
import styled from "styled-components";
import { GlobalStyle } from "./components/GlobalStyle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Sidebar xs={3} />
        <Main xs={9}>
          <Nav />
          <Today />
        </Main>
      </Wrapper>
    </>
  );
};

export default App;

const Wrapper = styled(Row)`
  height: 100vh;
  width: 100%;
  background-color: white;
`;

const Main = styled(Col)`
  background-color: white;
`;
