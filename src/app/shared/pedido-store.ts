import { DetallePedido, Producto } from './Interfaces';
import { computed, Signal, signal, WritableSignal } from '@angular/core';

const state = signal({
  pedidoList: new Map<number, DetallePedido>(),
  datosCliente: new Map<string, string>()
})


function getPedidosList() {
  return Array.from(state().pedidoList.values());
}

const getDatosCliente = computed(() => {
  console.log("Datos de cliente Computed", state().datosCliente);
  return state().datosCliente
}
);

function agregarProductoPedido(producto: Producto, cantidad: number) {
  const newPedidoList = new Map(state().pedidoList);
  const pedidoExistente = getPedidosList().find(pedido => pedido.producto.id === producto.id);

  if (pedidoExistente) {
    const pedidoActualizado = {
      ...pedidoExistente,
      cantidad: pedidoExistente.cantidad + cantidad
    };
    newPedidoList.set(pedidoExistente.id, pedidoActualizado);
  } else {
    const id = Math.max(0, ...Array.from(newPedidoList.keys())) + 1;
    const detallePedido: DetallePedido = { id, producto, cantidad };
    newPedidoList.set(id, detallePedido);
  }

  state.set(
    { 
      pedidoList: newPedidoList, 
      datosCliente: state().datosCliente 
    }
  );
}

function agregarDatosCliente(datosCliente: Partial<any>) {
  const newDatosCliente = new Map(state().datosCliente);

  Object.entries(datosCliente).forEach(([key, value]) => {
    newDatosCliente.set(key, value);
  });

  
  
  state.set(
    { 
      pedidoList: state().pedidoList, 
      datosCliente: newDatosCliente 
    }
  );

  // console.log("Nuevos datos de cliente", state().datosCliente);
  console.log(getDatosCliente());

}


function eliminarProductoPedido(pedidoId: number) {
  const updatedPedidoList = new Map(state().pedidoList);
  updatedPedidoList.delete(pedidoId);
  state.set(
    { 
      pedidoList: updatedPedidoList,
      datosCliente: state().datosCliente 
    }
  );
}

function calcularTotalPedido() {
  return getPedidosList().reduce((acc: number, detalle: DetallePedido) => acc + detalle.producto.modelo.precioVenta * detalle.cantidad, 0);
}

export { state, agregarProductoPedido, eliminarProductoPedido, getPedidosList, calcularTotalPedido, agregarDatosCliente, getDatosCliente };