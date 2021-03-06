import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
    ${reset};
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
    * {
        box-sizing: border-box;
    }

    body {
        background-color: ${props => props.theme.bgColor};
        color: ${props => props.theme.blackColor};
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Open Sans', sans-serif;
    }

    a {
        text-decoration: none;
        color: ${props => props.theme.blueColor};
    }

    input:focus {
      outline: none;  
    }

`;