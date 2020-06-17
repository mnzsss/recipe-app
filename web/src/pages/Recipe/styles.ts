import styled from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
  padding: 50px;
  max-width: 1344px;
  margin: 0 auto;

  > a {
    margin-top: 50px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    color: #ea687e;
    text-decoration: none;
    font-weight: 400;
    transition: all 0.2s;

    &:hover {
      color: ${transparentize(0.3, '#ea687e')};
    }
  }
`;

export const RecipeContent = styled.div`
  display: flex;

  img {
    height: 400px;
    width: 100%;
    max-width: 600px;
    object-fit: cover;
    margin-right: 40px;
    box-shadow: 3px 3px 10px #e2e2e2;
  }

  .ingredients {
    margin: 30px 0;

    div {
      display: flex;
      align-items: center;
      margin: 10px 0;

      input[type='checkbox'] {
        margin-right: 20px;
      }

      p {
        margin-bottom: 0;
      }
    }
  }

  div {
    h1 {
      font-size: 30px;
      font-weight: 600;
      margin: 10px 0;
    }

    span {
      font-weight: 300;
      color: #39008f;
      font-size: 14px;
    }
  }

  .footer {
    margin-top: 20px;
    display: flex;
    align-items: center;

    button {
      background: transparent;
      border: 0;
      color: #ea687e;
      font-weight: 600;
      display: flex;
      align-items: center;

      & + button {
        margin-left: 30px;
      }

      svg {
        margin-right: 5px;
      }
    }
  }
`;
