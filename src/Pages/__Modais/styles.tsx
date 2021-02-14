import { Modal } from '@material-ui/core';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WrapperContentModal = styled.div`
  width: 60vw;
  max-height: 80vh;

  overflow: scroll;
`;
