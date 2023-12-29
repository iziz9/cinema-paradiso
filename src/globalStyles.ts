import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyles = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  body {
    position: relative;
    line-height: 1;
    font-family: 'SUITE-Regular', sans-serif;
    background-color: #1a1a1a;
  }

  main,
  section {
    position: relative;
    max-width: 1024px;
    margin: auto;
  }

  main {
    height: auto;
    padding-bottom: 40px;
    min-height: calc(100vh - var(--height-header-pc) - var(--height-footer) - 20px);
  }

  footer {
    position: relative;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input,
  textarea {
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
    font-family: 'SUITE-Regular', sans-serif;
  }

  input:focus {
    outline: none;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'SUITE-Regular', sans-serif;
    font-size: 1rem;
  }

  #root {
    /* Screen max-width */
    --screen-m: 833px;
    --screen-pc: 1024px;

    /* Screen height */
    --height-header-pc: 80px;
    --height-header-mobile: 60px;
    --height-footer: 100px;

    /* Colors */
    --colors-dark: #3a3a3a;
    --colors-light: #ececec;
    --colors-error: #EF7C7C;
    --colors-yellow: #F4BA24;
    --colors-green: #A1BA50;
    --colors-gray: #cecece;
    --colors-darkgray: #242424;
    
    font-family: 'SUITE-Regular', sans-serif;
    position: relative;
    min-height: 100%;
    color: var(--colors-light);

  }

  .stop-scrolling {
    height: 100%;
    overflow: hidden;
  }

  input[type='text'],
  input[type='password'],
  input[type='submit'],
  input[type='search'],
  input[type='tel'],
  input[type='email'],
  input[type='button'],
  input[type='reset'],
  input[type='time'] {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    outline: 0;
  }

  footer {
    position: fixed;
    bottom: 0;
  }
`

export default GlobalStyles
