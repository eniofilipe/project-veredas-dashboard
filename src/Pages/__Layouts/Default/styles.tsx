import styled, { css } from 'styled-components';
import {
  AppBar, Toolbar, IconButton, Typography, Avatar, Drawer,
} from '@material-ui/core';
import {} from '@material-ui/core/styles';

export const Container = styled.div`
  display: flex;
`;

export const BarTools = styled(AppBar)<{open:boolean}>`
  
  z-index: 1200 !important;
  transition: width 3s ease-in-out;
  width: ${(props) => (props.open ? 'calc(100% - 240px)' : '100%')} !important;  
  position: fixed !important;
`;

export const ToolbarDashboard = styled(Toolbar)`
   padding-right: 24px;
`;

export const ToogleButton = styled(IconButton)<{open:boolean}>`

  ${(props) => (props.open && (
    css`
      display:none !important;
      color:#000;
    `))}

`;

export const Title = styled(Typography)`
  flex-grow: 1;
`;

export const UserMenu = styled(IconButton)``;

export const UserAvatar = styled(Avatar)``;

export const MenuDrawer = styled(Drawer)`



${(props) => (props.open ? (
    css` 
      > div {
        white-space: nowrap;
        width: 240px;
        z-index: 1199;
        
      }
        
        width: 240px;
        
  `
  ) : (css`
      > div {
        width: 52px;
        z-index: 1199;
        overflow-x: hidden; 
      }
      
        overflow-x: hidden; 
        width: 52px; 
        background: #000;
  `))}

`;

export const ToolbarClose = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
`;

export const ToolbarCloseButton = styled(IconButton)``;

export const AppSpaceBar = styled.div`
  height: 64px;      
`;

export const Main = styled.main`
  flex-grow: 1;
  height: 100vh;
  overflow: auto;
`;
