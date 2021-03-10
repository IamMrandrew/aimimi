import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #70BED1;
    --completed: rgba(112, 190, 209, 0.35);
    --primaryShaded: #1C4B56 
  }
  * {
      font-family: 'Roboto', "Open Sans", sans-serif;
      -webkit-font-smoothing: antialiased;
  }
  
`;
