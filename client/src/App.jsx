import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import Today from "./components/Today";
import styled from "styled-components";
import { GlobalStyle } from "./components/GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Sidebar />
        <Main>
          <Nav />
          <Today />
        </Main>
      </Wrapper>
    </>
  );
};

export default App;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: lightcoral;
`;

const Main = styled.div`
  background-color: #fff;
`;
