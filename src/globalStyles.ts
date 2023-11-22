import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'SUITE-Regular';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
  color: #3a3a3a;
  font-family: 'SUITE-Regular', sans-serif;
}

ol,
ul,
menu {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

main,
section {
  max-width: 1024px;
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
}

#root {
  font-family: 'SUITE-Regular', sans-serif;
  position: relative;
  min-height: 100%;
  color: #3a3a3a;

  /* Screen max-width */
  --screen-m: 833px;
  --screen-pc: 1024px;
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
export const COLORS = {
  font: '#3A3A3A',
  error: '#EF7C7C',
}

export const FONT = {
  pc: '16px',
  'pc-lg': '20px',
  m: '14px',
  'm-sm': '12px',
  'm-lg': '16px',
}

export default GlobalStyles