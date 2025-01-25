import { DetallePedido } from "../shared/Interfaces";

export function getNombreLargoDetallePedido(detallePedido: DetallePedido) {
    return detallePedido.producto.modelo.nombre + " " + detallePedido.producto.modelo.variante + " " + (detallePedido.producto.talle ? detallePedido.producto.talle : "");
}

export function capitalizar(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}