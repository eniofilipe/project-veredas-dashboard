/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import JsPDF, { CellConfig } from 'jspdf';
import dayjs from 'dayjs';
import { applyPlugin } from 'jspdf-autotable';
import { getRelatorioPedidos } from '../../../Api/Relatorios';
import { moneyMask } from '../../../Utilities/masks';
import toasts from '../../../Utilities/toasts';
import logo from '../../../Imagens/logo_transparent.png';
import { getOfertas } from '../../../Api/Ofertas';

applyPlugin(JsPDF);

const formatCell = (data: any) => {
  if (data.cell.raw && data.cell.raw.nodeName === 'TH') {
    data.cell.styles.fontStyle = 'bold';
  }

  if (data.cell.raw && data.cell.raw.className === 'totalItem') {
    data.cell.styles.fontStyle = 'bold';
  }
};

const gerarRelatorio = async () => {
  try {
    const doc = new JsPDF();

    const responseValidadeOferta = await getOfertas();

    if (responseValidadeOferta.data.length > 0) {
      const response = await getRelatorioPedidos(responseValidadeOferta.data[0].id);

      const middle = doc.internal.pageSize.getWidth() / 2 - 75 / 2;

      const dateOffer = dayjs(responseValidadeOferta.data[0].validade).format('DD-MM-YYYY');

      doc.addImage(logo, 'PNG', middle, 10, 75, 25);
      doc.setFontSize(20);
      doc.text('Relatório de pedidos semanal', 15, 45);
      doc.setFontSize(14);
      doc.text(`Relatório de pedidos de oferta com validade até ${dateOffer}`, 15, 55);

      response.data.forEach((item, pos) => {
        let innerElement = `<thead>
      <tr>
        <th colspan="8">
          Pedido #${item.pedido.id}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>
          Nome:
        </th>
        <td colspan="5">
          ${item.cliente.nome}
        </td>
        <th colspan="1">
          <strong>Tel:</strong>
        </th>
        <td colspan="1">
         ${item.cliente.telefone}
        </td>
      </tr>
      <tr>
        <th>
        Endereço:
        </th>
        <td colspan="1">
          ${item.cliente.endereco.logradouro}
        </td>
        <td colspan="1">
          Nº ${item.cliente.endereco.numero}
        </td>
        <td colspan="1">
        ${item.cliente.endereco.bairro}
        </td>
        <td colspan="1">
        ${item.cliente.endereco.cidade}/${item.cliente.endereco.estado}
        </td>
      </tr>
        <tr>
          <th colspan="4">
            <strong>PRODUTOS</strong>
          </th>
          <th colspan="1">
            <strong >QTD</strong>
          </th>
          <th colspan="2">
            <strong >V. Unit</strong>
          </th>
          <th colspan="2">
            <strong>V. Total</strong>
          </th>
        </tr>
      `;

        item.pedido.produtos.forEach((prod) => {
          const valueUnit = moneyMask(prod.preco.toFixed(2));
          const valueTotal = moneyMask((prod.preco * prod.quantidade).toFixed(2));

          const rowProduct = `
          <tr>
            <td colspan="4">
              ${prod.nome}
            </td>
            <td colspan="1">
              ${prod.quantidade}
            </td>
            <td colspan="2">
              ${valueUnit}
            </td>
            <td colspan="2">
              ${valueTotal}
            </td>
          </tr>
        `;
          innerElement = innerElement.concat(rowProduct);
        });

        const totalItem = moneyMask(item.pedido.totalPedido.toFixed(2));

        const endElement = `
      <tr>
        <th colspan="7">
          <strong>Total:</strong>
        </th>
        <td colspan="1" class="totalItem">
          <strong>${totalItem}</strong>
        </td>
      </tr>
      <tr>
        <th colspan="8"">
          <strong>Tipo de frete:</strong> ${item.pedido.frete}
        </th>
      </tr>
      </tbody>
      `;

        innerElement = innerElement.concat(endElement);

        const element = document.createElement('table');
        element.innerHTML = innerElement;

        if (pos < 1) {
          doc.autoTable({
            html: element,
            startY: 65,
            didParseCell: formatCell,
          });
        } else {
          doc.autoTable({
            html: element,
            startY: doc.lastAutoTable.finalY + 10,
            pageBreak: 'avoid',
            didParseCell: formatCell,
          });
        }
      });

      doc.save(`relatorio_pedidos-${dateOffer}.pdf`);
    } else {
      toasts.error('Não há ofertas em aberto');
    }
  } catch (error) {
    console.log(error);
    toasts.error('Erro ao gerar relatório de pedidos');
  }
};

export default gerarRelatorio;
