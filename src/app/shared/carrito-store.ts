import { DetallePedido, Producto } from './Interfaces';
import { signal, WritableSignal } from '@angular/core';

const pedidoList: WritableSignal<DetallePedido[]> = signal([]);

// TODO: Agregar cantidad evitar repetidos
function agregarProductoCarrito(producto: Producto, cantidad:number) {

    const id = pedidoList().map(pedido => pedido.id).reduce((acc, id) => Math.max(acc, id), 0) + 1;

    const detallePedido: DetallePedido = {id, producto, cantidad};
    // Obtén el valor actual del signal
    const currentPedidoList = pedidoList();
  
    // Agrega el nuevo producto al array
    const updatedPedidoList = [...currentPedidoList, detallePedido];
  
    // Actualiza el valor del signal
    pedidoList.set(updatedPedidoList);
  }

function eliminarProductoCarrito(pedidoId: number) {
    // Obtén el valor actual del signal
    const currentPedidoList = pedidoList();
  
    // Elimina el producto del array
    const updatedPedidoList = currentPedidoList.filter(pedido => pedido.id !== pedidoId);
  
    // Actualiza el valor del signal
    pedidoList.set(updatedPedidoList);
  }

export { pedidoList, agregarProductoCarrito, eliminarProductoCarrito };