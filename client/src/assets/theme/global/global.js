import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    transition: all .2s linear;
  }
  *:focus {
  outline: 0;
  outline: none;
  }
  html {
    font-size: 62.5%;
    background-color: #eef0f1;
    box-sizing: border-box;
    @media ${(props) => props.theme.breakpoints.lg} {
      font-size: 60%;
    }
    @media ${(props) => props.theme.breakpoints.md} {
      font-size: 55%;
    }
  }
  body {

    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.6;

    text-decoration: none;
    /* text-transform: capitalize; */
    transition: all .2s linear;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: none;

    a:-webkit-any-link {
    color: black;
    cursor: pointer;
    text-decoration: none;
}

h1,h2,h3,h4,h5,h6,button {
    font-family: ${(props) => props.theme.fonts.title};
  }

  p {
    font-family: ${(props) => props.theme.fonts.main};

  }

  h1 {
    font-size: 64px;
    @media ${(props) => props.theme.breakpoint.xl} {
      font-size: 54px;
    }
    @media ${(props) => props.theme.breakpoint.lg} {
      font-size: 48px;
    }
    @media ${(props) => props.theme.breakpoint.md} {
      font-size: 36px;
    }
    @media ${(props) => props.theme.breakpoint.sm} {
      font-size: 28px;
    }
  }


    .container{
      padding: 0 30rem;

      @media ${(props) => props.theme.breakpoint.xl} {
        padding: 0 15rem;
    }

      @media ${(props) => props.theme.breakpoint.lg} {
        padding: 0 10rem;
    }
    @media ${(props) => props.theme.breakpoint.md} {
        padding: 0 5rem;
    }
    @media ${(props) => props.theme.breakpoint.sm} {
        padding: 0 1rem;
    }
    }
  }

`;
