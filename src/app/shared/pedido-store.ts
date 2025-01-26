import { Observable } from 'rxjs';
import { PedidosService } from '../services/pedidos.service';
import { DetallePedido, newPedido, Producto } from './Interfaces';
import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidosStore {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl

  postNewPedido(pedido: newPedido): Observable<any> {
    return this.http.post(`${this.apiUrl}/pedido`, pedido)
  }
}

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
    newPedidoList.set(pedidoExistente.producto.id, pedidoActualizado);
  } else {
    const id = Math.max(0, ...Array.from(newPedidoList.keys())) + 1;
    const detallePedido: DetallePedido = { producto, cantidad, precioDeCosto: producto.modelo.precioCosto * cantidad, precioDeVenta: producto.modelo.precioVenta * cantidad };
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


function eliminarProductoPedido(pedido: DetallePedido) {
  const updatedPedidoList = new Map(state().pedidoList);
  const keyToDelete = Array.from(updatedPedidoList.entries()).find(([_, value]) => value === pedido)?.[0];
  if (keyToDelete !== undefined) {
    updatedPedidoList.delete(keyToDelete);
  }
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

function calcularCostoTotalPedido() {
  return getPedidosList().reduce((acc: number, detalle: DetallePedido) => acc + detalle.producto.modelo.precioCosto * detalle.cantidad, 0);
}

function reiniciarPedidoState(){
  state.set({pedidoList: new Map<number, DetallePedido>(), datosCliente: new Map<string, string>()});
}

export { state, agregarProductoPedido, eliminarProductoPedido, getPedidosList, calcularTotalPedido, agregarDatosCliente, getDatosCliente, reiniciarPedidoState, calcularCostoTotalPedido };