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
  display: grid;
  gap: 48px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: flex-end;

  div {
    h1 {
      font-size: 64px;
      font-weight: 600;
      line-height: 130%;
      margin-bottom: 30px;
    }

    p {
      margin-bottom: 40px;
    }

    .button {
      border: 2px solid #39008f;
      background: transparent;
      color: #39008f;

      &:hover {
        background-color: ${shade(0.3, '#39008F')};
        color: #fff;
      }
    }
  }
`;

export const Recipes = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  margin-top: 80px;

  div {
    max-width: 380px;

    img {
      width: 100%;
      max-height: 250px;
      object-fit: cover;
      box-shadow: 3px 3px 10px #e2e2e2;
      margin-bottom: 25px;
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
      background-color: transparent;
      text-transform: uppercase;
      border: 2px solid #39008f;
      border-radius: 25px;
      padding: 8px 24px;
      font-size: 12px;
      line-height: 15px;
      color: #39008f;
      font-weight: 500;
      transition: all 0.2s;
      text-decoration: none;

      &:hover {
        background-color: ${shade(0.08, '#39008f')};
        color: #fff;
      }
    }
  }
`;
