import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: transparent;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid ${transparentize(0.7, '#ea687e')};
  color: #aaa;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #39008f;
    `}

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #666360;

    &::placeholder {
      color: #aaa;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  width: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &:before {
      border-color: #c53030 transparent;
    }
  }
`;
