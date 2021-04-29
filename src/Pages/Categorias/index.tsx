/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
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
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { DeleteOutline, Add, Edit, ErrorSharp } from '@material-ui/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AddCategoryContainer, InputCategoria } from './styles';

import { getCategorias, postCategoria, deleteCategoria, editCategoria } from '../../Api/Categorias';

import { Categoria } from '../../Types';
import { CategoriaValidation } from './validation';

interface FormShape {
  categoria: string;
}

const index = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { register, handleSubmit, errors, setValue } = useForm<FormShape>({
    resolver: yupResolver(CategoriaValidation),
  });

  const remove = async (id: number) => {
    try {
      setLoading(true);
      const response = await deleteCategoria(id);

      listCategorias();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const edit = (categoria: Categoria) => {
    console.log(categoria);
    history.push('/categoria/editar', categoria);
  };

  const cadastroCategoria = async (categoria: string) => {
    try {
      setLoading(true);

      await postCategoria({
        nome: categoria,
      });

      listCategorias();
      setValue('categoria', '');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const listCategorias = async () => {
    try {
      setLoading(true);
      const response = await getCategorias();

      setCategorias(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listCategorias();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (loading) return;

    await cadastroCategoria(data.categoria);
  });

  return (
    <div style={{ width: '100%' }}>
      <AddCategoryContainer>
        <form onSubmit={(e) => onSubmit(e)}>
          <span>Categoria: </span>
          <InputCategoria
            id="outlined-basic"
            placeholder="Nome categoria"
            variant="outlined"
            inputRef={register}
            size="small"
            name="categoria"
            error={!!errors.categoria?.message}
            helperText={errors.categoria?.message}
          />
          <Button type="submit" variant="contained" startIcon={<Add />}>
            Adicionar
          </Button>
        </form>
      </AddCategoryContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias.map((item) => (
              <TableRow hover tabIndex={-1} key={`cod${item.id}`}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>
                  <Button variant="contained" startIcon={<Edit />} onClick={() => edit(item)}>
                    Editar
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" startIcon={<DeleteOutline />} onClick={() => remove(item.id)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow />
          </TableBody>
        </Table>
        <Backdrop open={loading} style={{ zIndex: 10 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      </TableContainer>
    </div>
  );
};

export default index;
