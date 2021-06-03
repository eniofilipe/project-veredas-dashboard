import { Modal } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 10px;
`;

export const PictureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0 10px;
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

export const LabelError = styled.p`
  margin: 0;
  font-size: 0.75rem;
  margin-top: 3px;
  text-align: left;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  color: #f44336;
`;
