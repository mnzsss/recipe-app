import { createGlobalStyle } from 'styled-components';
import { shade } from 'polished';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

html, body{
  scroll-behavior: smooth;
}

body {
 background: #FFFEFD;
 color: #AAAAAA;
 -webkit-font-smoothing: antialiased;

}

body, input, button {
 font-size: 14px;
 line-height: 22px;
 font-family: 'Roboto', sans-serif;
}

h1, h2,h3{
  line-height: 1;
  color: #ea687e;
}

button {
 cursor: pointer;
}

.button {
    color: #fffefd;
    background-color: #ea687e;
    text-transform: uppercase;
    border: 0;
    border-radius: 25px;
    padding: 15px 40px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
    text-decoration: none;

    &:hover {
      background-color: ${shade(0.08, '#ea687e')};
    }
  }
`;
