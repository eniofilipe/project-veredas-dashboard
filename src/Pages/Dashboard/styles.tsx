import { Paper } from '@material-ui/core';
import styled from 'styled-components';

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

export const Card = styled(Paper)`
  background-color: #e91d1d;
  width: 25%;
  text-align: center;
`;

export const CardInformacao = styled(Card)`
  width: 70%;
`;

export const Titulo = styled.p`
  font-weight: bold;
  text-align: center;
`;
