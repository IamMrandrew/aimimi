import { createGlobalStyle } from "styled-components/macro";

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #70BED1;
    --completed: rgba(112, 190, 209, 0.35);
    --primaryTinted: rgba(28, 75, 86, 0.6);
    --primaryShaded: #1C4B56 ;
    --primaryGoal: #73CED9;
    --grey: rgba(0, 0, 0, 0.08);
    --background:#348CA2;
    --greyBackground: #FAFAFA;
  }
  * {
      font-family: 'Roboto', "Open Sans", sans-serif;
      -webkit-font-smoothing: antialiased;
  }
  
  .row {
    margin: 0
  }

`;
