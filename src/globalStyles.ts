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
    min-height: calc(100vh - var(--height-header-layout) - var(--height-footer) - 20px);
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
    --screen-mobile: 450px;
    --screen-tablet: 833px;
    --screen-pc: 1024px;

    /* Screen height */
    --height-header-layout: 60px;
    --height-footer: 100px;

    /* Colors */
    --colors-dark: #3a3a3a;
    --colors-light: #ececec;
    --colors-error: #EF7C7C;
    --colors-yellow: #F4BA24;
    --colors-green: #A1BA50;
    --colors-gray: #cecece;
    --colors-middlegray: #707070;
    --colors-darkgray: #242424;
    --colors-transdark: #00000040;
    --colors-transblack: #000000c7;
    
    font-family: 'SUITE-Regular', sans-serif;
    position: relative;
    min-height: 100%;
    color: var(--colors-light);


  /* 기본 적용 스타일 바꾸기 */
  --toastify-toast-width: 320px;
  --toastify-toast-background: #fff;
  --toastify-toast-min-height: 80px;
  --toastify-toast-max-height: 800px;
  --toastify-font-family: 'SUITE-Regular', sans-serif;
  --toastify-text-color-light: var(--colors-light);
  --toastify-text-color-dark: #fff;
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
//
