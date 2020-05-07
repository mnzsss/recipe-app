import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  padding: 50px;
  max-width: 1344px;
  margin: 0 auto;
`;

export const Main = styled.main`
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    h1 {
      font-size: 70px;
      font-weight: 600;
      margin-bottom: 30px;

      span {
        font-size: 30px;
        font-weight: 500;
      }
    }

    p {
      margin-bottom: 40px;
    }

    .button {
      background-color: #39008f;

      &:hover {
        background-color: ${shade(0.3, '#39008F')};
      }
    }
  }
`;

export const Recipes = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  margin-top: 100px;

  div {
    max-width: 380px;

    img {
      width: 100%;
      max-height: 250px;
      object-fit: cover;
      box-shadow: 3px 3px 10px #e2e2e2;
      margin-bottom: 25px;
    }

    span {
      font-weight: 300;
      color: #39008f;
      font-size: 14px;
    }

    h2 {
      margin-top: 5px;
      font-size: 18px;
      font-weight: 600;
    }

    p {
      padding: 10px 0;
      margin-bottom: 20px;
      display: block;

      span {
        color: #aaa;
        font-size: 16px;
      }
    }

    a {
      font-size: 12px;
      padding: 10px 30px;
    }
  }
`;
