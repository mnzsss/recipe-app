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
  align-items: center;

  form {
    width: 100%;
    max-width: 450px;

    button {
      margin-top: 30px;
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
