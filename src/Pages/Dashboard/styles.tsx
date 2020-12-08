import { Paper } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div``;

export const HeaderDashboard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Card = styled(Paper)`
  elevation: 0;
  background-color: #e91d1d;
  width: 25%;
  text-align: center;
`;
