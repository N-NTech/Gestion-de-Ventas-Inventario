import { DetallePedido, Producto } from './Interfaces';
import { signal, WritableSignal } from '@angular/core';

const pedidoList: WritableSignal<DetallePedido[]> = signal([]);

// TODO: Agregar cantidad evitar repetidos
function agregarProductoCarrito(producto: Producto , cantidad:number) {
  console.log("Agregando producto al carrito", producto, cantidad)

  const pedidoConProductoRepetido = pedidoList().find(pedido => pedido.producto.id === producto.id)
  console.log("Resultado del find: ",pedidoConProductoRepetido)

  if(pedidoConProductoRepetido){
    console.log("Producto repetido")
    pedidoConProductoRepetido.cantidad += cantidad;
  }else{
    console.log("Producto no repetido")
    const id = pedidoList().map(pedido => pedido.id).reduce((acc, id) => Math.max(acc, id), 0) + 1;
    console.log("ID del nuevo pedido: ", id)
  
    const detallePedido: DetallePedido = {id, producto, cantidad};
    console.log("Detalle del pedido: ", detallePedido)
  
    const updatedPedidoList = [...pedidoList(), detallePedido];
    console.log("Lista de pedidos actualizada: ", updatedPedidoList)
  
    pedidoList.set(updatedPedidoList);
  }
  }


function eliminarProductoCarrito(pedidoId: number) {

    const currentPedidoList = pedidoList();
  
    const updatedPedidoList = currentPedidoList.filter(pedido => pedido.id !== pedidoId);
  
    pedidoList.set(updatedPedidoList);
  }

export { pedidoList, agregarProductoCarrito, eliminarProductoCarrito };