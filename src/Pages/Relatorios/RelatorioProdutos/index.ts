/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import JsPDF, { CellConfig } from 'jspdf';
import dayjs from 'dayjs';
import { applyPlugin } from 'jspdf-autotable';
import { getRelatorioProdutos } from '../../../Api/Relatorios';
import logo from '../../../Imagens/logo_transparent.png';
import { getOfertas } from '../../../Api/Ofertas';
import { moneyMask } from '../../../Utilities/masks';
import toasts from '../../../Utilities/toasts';

applyPlugin(JsPDF);

const gerarRelatorio = async () => {
  try {
    const doc = new JsPDF();

    const responseValidadeOferta = await getOfertas();

    if (responseValidadeOferta.data.length > 0) {
      const response = await getRelatorioProdutos(responseValidadeOferta.data[0].id);

      const middle = doc.internal.pageSize.getWidth() / 2 - 75 / 2;

      const dateOffer = dayjs(responseValidadeOferta.data[0].validade).format('DD-MM-YYYY');

      doc.addImage(logo, 'PNG', middle, 10, 75, 25);
      doc.setFontSize(20);
      doc.text('Relatório de produtos semanal', 15, 45);
      doc.setFontSize(14);
      doc.text(`Relatório de produtos de oferta com validade até ${dateOffer}`, 15, 55);

      let innerElement = `<thead>
          <tr>
            <th >Código</th>
            <th>Produto</th>
            <th >Quantidade</th>
          </tr>
        </thead>
        <tbody>
        `;

      response.data.forEach((item, pos) => {
        const itemElement = `<tr>
           <td >${item.idProduto}</td>
            <td>${item.nomeProduto}</td>
            <td >${item.quantidade}</td>
          </tr>`;

        innerElement = innerElement.concat(itemElement);
      });

      const endInner = `</tbody>`;

      innerElement = innerElement.concat(endInner);

      const element = document.createElement('table');
      element.innerHTML = innerElement;

      doc.autoTable({
        html: element,
        startY: 65,
      });

      doc.save(`relatorio_produtos-${dateOffer}.pdf`);
    } else {
      toasts.error('Não há ofertas em aberto');
    }
  } catch (error) {
    console.log(error);
    toasts.error('Erro ao gerar relatório de pedidos');
  }
};

export default gerarRelatorio;
