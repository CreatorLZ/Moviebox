import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'DM Sans', sans-serif;
    ::placeholder {
  color: #FFFFFF;
  opacity: 1; /* Firefox */
}
}
`;

export default GlobalStyles;
