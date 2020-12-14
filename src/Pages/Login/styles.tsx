import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

export const Paper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AvatarLogin = styled(Avatar)`
  margin: 20px;
  background-color: rgb(220, 0, 78);
`;

export const Form = styled.form`
  width: 100%;
  margin-top: 20px;
`;

export const ButtonSubmit = styled(Button)`
  margin: 10px;
`;
