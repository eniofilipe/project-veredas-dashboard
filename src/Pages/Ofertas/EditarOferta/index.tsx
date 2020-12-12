import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { Oferta } from '../../../Types';
import { getProdutosOfertas } from '../../../Api/Ofertas';

const index = () => {
  const [produtos, setProdutos] = useState<Oferta>();

  const history = useHistory();

  const listProdutos = async () => {
    try {
      const response = await getProdutosOfertas();

      setProdutos(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    listProdutos();
  }, []);
};

export default index;
