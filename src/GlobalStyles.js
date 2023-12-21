import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'DM Sans', sans-serif;
    scroll-behavior: smooth;
    ::placeholder {
  color: #FFFFFF;
  opacity: 1; /* Firefox */
}
}
body {
  scroll-behavior: smooth;
}
`;

export default GlobalStyles;
