import { Card, Paper } from '@material-ui/core';
import styled from 'styled-components';
import theme from '../../Styles/theme';

export const Container = styled.div``;

export const HeaderDashboard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  align-items: center;
`;

export const BodyDashboard = styled.div`
  margin-top: 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledCard = styled(Card)`
  background-color: #e91d1d;
  height: 100%;
  text-align: center;
  width: 100%;
`;

export const CardInformacao = styled(StyledCard)``;

export const Info = styled.span`
  font-weight: bold;
  font-size: 42px;
  color: ${theme.palette.primary.main};
`;

export const Titulo = styled.p`
  font-weight: bold;
  text-align: center;
`;
