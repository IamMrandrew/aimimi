import { createGlobalStyle } from "styled-components/macro";

// Global style that used for all components
export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #70BED1;
    --completed: rgba(112, 190, 209, 0.35);
    --primaryTinted: rgba(28, 75, 86, 0.6);
    --primaryShaded: #1C4B56 ;
    --primaryGoal: #80D3DC;
    --primaryTrans: #F4FBFB;
    --grey: rgba(0, 0, 0, 0.08);
    --primaryMild:#348CA2;
    --background: #FAFAFA;
    --placeholder: #888888;
    --monoPrimary: #202020;
  }
  * {
      font-family: 'Roboto', "Open Sans", sans-serif;
      -webkit-font-smoothing: antialiased;
  }
  
  .row {
    margin: 0
  }

`;
