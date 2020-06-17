import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    cursor: pointer;
  }

  div {
    display: flex;
    align-items: center;

    a + a {
      margin-left: 30px;
    }

    .link {
      background: transparent;
      border: 0;
      color: #ea687e;
      font-weight: 600;
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: all 0.4s;

      svg {
        margin-right: 5px;
      }

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;
