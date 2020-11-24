/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Paper,
  TextField,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { PhotoCamera, Add, Clear } from '@material-ui/icons';
import { Container } from './styles';

const rows = [
  {
    id: '#1',
    category: 'Hortaliças',
  },
  {
    id: '#2',
    category: 'Veganos',
  },
];

const index = () => {
  const history = useHistory();
  const [image, setImage] = useState({ preview: '', raw: {} as File });
  const [categorias, setCategorias] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  return (
    <Container>
      <Paper>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              {image.preview ? (
                <img src={image.preview} alt="" width="300" height="300" />
              ) : (
                <>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="icon-button-file"
                    type="file"
                    onChange={handleChange}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField placeholder="Nome" />
              <TextField placeholder="Descrição" />
              <div>
                <span>Categorias</span>
                <IconButton color="primary" component="span" onClick={() => setOpenModal(true)}>
                  <Add />
                </IconButton>
              </div>
              <div>
                {categorias.map((categoria, i) => (
                  <div key={`cat${categoria}`}>
                    <span>{categoria}</span>
                    <IconButton
                      color="primary"
                      component="span"
                      onClick={() => {
                        const listAux = categorias;
                        listAux.splice(i, 1);

                        setCategorias([...listAux]);
                      }}
                    >
                      <Clear />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => history.goBack()}>Voltar</Button>
              <Button>Cadastrar Produto</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cód</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((item) => (
                <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                  <TableCell>{item.id}</TableCell>

                  <TableCell>{item.category}</TableCell>

                  <TableCell>
                    <Button
                      onClick={() => {
                        setCategorias(categorias.concat(item.category));
                        setOpenModal(false);
                      }}
                    >
                      Selecionar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow />
            </TableBody>
          </Table>
        </TableContainer>
      </Modal>
    </Container>
  );
};

export default index;
