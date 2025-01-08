import { DetallePedido, Producto } from './Interfaces';
import { signal, WritableSignal } from '@angular/core';

const state = signal({
  pedidoList: new Map<number, DetallePedido>()
})

function getPedidosList() {
  return Array.from(state().pedidoList.values());
}

function agregarProductoPedido(producto: Producto, cantidad: number) {
  const pedidoList = new Map(state().pedidoList);
  const pedidoExistente = getPedidosList().find(pedido => pedido.producto.id === producto.id);

  if (pedidoExistente) {
    const pedidoActualizado = {
      ...pedidoExistente,
      cantidad: pedidoExistente.cantidad + cantidad
    };
    pedidoList.set(pedidoExistente.id, pedidoActualizado);
  } else {
    const id = Math.max(0, ...Array.from(pedidoList.keys())) + 1;
    const detallePedido: DetallePedido = { id, producto, cantidad };
    pedidoList.set(id, detallePedido);
  }

  state.set({ pedidoList });
}


function eliminarProductoPedido(pedidoId: number) {
  const updatedPedidoList = new Map(state().pedidoList);
  updatedPedidoList.delete(pedidoId);
  state.set({ pedidoList: updatedPedidoList });
}

function calcularTotalPedido() {
  return getPedidosList().reduce((acc: number, detalle: DetallePedido) => acc + detalle.producto.modelo.precioVenta * detalle.cantidad, 0);
}

export { state, agregarProductoPedido, eliminarProductoPedido, getPedidosList, calcularTotalPedido };