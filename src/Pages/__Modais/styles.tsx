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
  height: 100%;
  overflow: auto;
`;

export const WrapperButtons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  padding: 10px;
  gap: 20px;

  border-top: 1px solid #ccc;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
`;

export const WrapperTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px;
  gap: 20px;

  border-bottom: 1px solid #ccc;
`;

export const Title = styled.span`
  font-size: 24px;
  font-weight: 400px;
`;
