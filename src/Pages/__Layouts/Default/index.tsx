import React, { useState, useContext } from 'react';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as CustomersIcon,
  BarChart as ReportsIcon,
  ExitToApp as LogoutIcon,
  Face as FaceIcon,
  ShoppingBasket,
  Storefront,
} from '@material-ui/icons';

import { Divider, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Popover, Paper } from '@material-ui/core';
import AuthContext from '../../../Contexts/auth';
import History from '../../../Services/history';

import {
  Container,
  BarTools,
  ToolbarDashboard,
  ToogleButton,
  Title,
  UserMenu,
  UserAvatar,
  MenuDrawer,
  ToolbarClose,
  ToolbarCloseButton,
  AppSpaceBar,
  Main,
  Content,
} from './styles';

const Default: React.FC = ({ children }) => {
  const { admin, signOut } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function goToPedidos() {
    History.push('/pedidos');
  }

  function goToClientes() {
    History.push('/clientes');
  }

  function goToDashboard() {
    History.push('/dashboard');
  }

  function goToRelatorios() {
    History.push('/relatorios');
  }

  function goToOfertas() {
    History.push('/ofertas');
  }

  function goToUsuarios() {
    History.push('/usuarios');
  }

  function goToCategorias() {
    History.push('/categorias');
  }

  function goToProdutos() {
    History.push('/produtos');
  }
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'simple-popover' : undefined;

  function handleOpen() {
    setOpen(!open);
    console.log(open);
  }

  return (
    <Container>
      <CssBaseline />
      <BarTools open={open} position="absolute">
        <ToolbarDashboard>
          <ToogleButton edge="start" color="inherit" aria-label="open drawer" onClick={() => handleOpen()} open={open}>
            <MenuIcon />
          </ToogleButton>
          <Title variant="h6" color="inherit" noWrap>
            Veredas da Terra
          </Title>
          <UserMenu aria-describedby={id} color="inherit" onClick={(e) => handleClick(e)}>
            <UserAvatar />
          </UserMenu>
          <Popover
            id={id}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={() => handleClose()}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Paper>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <FaceIcon />
                  </ListItemIcon>
                  <ListItemText primary={admin?.nome} />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => signOut()}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sair" />
                </ListItem>
              </List>
            </Paper>
          </Popover>
        </ToolbarDashboard>
      </BarTools>
      <MenuDrawer variant="permanent" open={open}>
        <ToolbarClose>
          <ToolbarCloseButton onClick={() => handleOpen()}>
            <ChevronLeftIcon />
          </ToolbarCloseButton>
        </ToolbarClose>
        <Divider />
        <List>
          <ListItem button onClick={() => goToDashboard()}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Principal" />
          </ListItem>
          <ListItem button onClick={() => goToOfertas()}>
            <ListItemIcon>
              <Storefront />
            </ListItemIcon>
            <ListItemText primary="Ofertas" />
          </ListItem>
          <ListItem button onClick={() => goToPedidos()}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Pedidos" />
          </ListItem>
          <ListItem button onClick={() => goToProdutos()}>
            <ListItemIcon>
              <ShoppingBasket />
            </ListItemIcon>
            <ListItemText primary="Produtos" />
          </ListItem>
          <ListItem button onClick={() => goToCategorias()}>
            <ListItemIcon>
              <CustomersIcon />
            </ListItemIcon>
            <ListItemText primary="Categorias" />
          </ListItem>
          <ListItem button onClick={() => goToUsuarios()}>
            <ListItemIcon>
              <ReportsIcon />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
          </ListItem>
        </List>
      </MenuDrawer>
      <Main>
        <AppSpaceBar />
        <Content>{children}</Content>
      </Main>
    </Container>
  );
};

export default Default;
