/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Table,
  Paper,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Container, AddOrderContainer } from './styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
}));

const rows = [
  {
    quantity: '4',
    id: '463',
    name: 'Alface',
    status: 'Pacote de 300g',
    category: 'Hortaliças',
    price: 19,
    delete: () => <Button>Excluir</Button>,
  },
  {
    quantity: '1',
    id: '430',
    name: 'Cebola',
    status: 'Pacote de 500g',
    category: 'Hortaliças',
    price: 10,
    delete: () => <Button>Excluir</Button>,
  },
];

const index = () => {
  const classes = useStyles();
  const options = ['Dinheiro', 'Cartão de Débito'];
  const [type, setType] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: any) => {
    setType(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Container>
      <AddOrderContainer>
        <span>Cliente:</span>
        <TextField disabled id="outlined-basic" variant="outlined" />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Tipo de Pagamento</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={type}
            onChange={handleChange}
          >
            {options &&
              options.map((op, i) => (
                <MenuItem value={op} key={i}>
                  {op}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button>Adicionar Cliente</Button>
        <Button>Adicionar Produto</Button>
      </AddOrderContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Quantidade</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Categorias</TableCell>
              <TableCell>Preço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item) => (
              <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                </TableCell>
                <TableCell>{item.delete()}</TableCell>
              </TableRow>
            ))}
            <TableRow />
          </TableBody>
        </Table>
      </TableContainer>
      <Button>Voltar</Button>
      <Button>Salvar</Button>
    </Container>
  );
};

export default index;
