import styled from 'styled-components';

export const Container = styled.div`
  padding: 50px;
  max-width: 1344px;
  margin: 0 auto;
`;

export const Content = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  h2 {
    margin-bottom: 20px;
  }

  form {
    width: 100%;
    max-width: 600px;

    button {
      margin-top: 30px;
    }

    h3 {
      font-size: 14px;
      line-height: 16px;
      font-weight: normal;
      color: #aaaaaa;
    }

    .difficulty {
      margin: 24px 0;

      button {
        border-radius: 8px;
        margin-top: 20px;
        color: #ea687e;
        border: 2px solid #ea687e;
        background-color: transparent;
        padding: 8px 36px;

        &:hover {
          background-color: #39008f;
          color: #ffffff;
          border-color: #39008f;
        }

        &.selected {
          background-color: #39008f;
          color: #ffffff;
          border-color: #39008f;
        }

        & + button {
          margin-left: 20px;
        }
      }
    }

    .ingredients {
      margin: 24px 0;

      button {
        margin: 0;
        background-color: transparent;
        padding: 20px;
        border: 0;
        transition: opacity 0.3s;
        display: flex;
        align-items: center;
        color: #39008f;

        svg {
          margin-right: 7px;
        }

        &:hover {
          opacity: 0.7;
        }
      }

      .ingredient {
        margin: 15px 0;
        display: flex;
        align-items: center;

        button {
          height: 100%;
          margin: 0;
          background-color: transparent;
          padding: 20px;
          border: 0;
          transition: opacity 0.3s;

          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }
`;

export const ImportFileContainer = styled.section`
  width: 100%;
  height: 450px;
  border-radius: 5px;
  padding-right: 50px;

  span {
    color: #12a454;
    margin-top: 15px;
    display: block;
  }
  span.error {
    color: #e83f5b;
  }
`;
