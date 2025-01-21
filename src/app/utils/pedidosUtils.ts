import { DetallePedido } from "../shared/Interfaces";

export function getNombreLargoDetallePedido(detallePedido: DetallePedido) {
    return detallePedido.producto.modelo.nombre + " " + detallePedido.producto.modelo.variante + " " + (detallePedido.producto.talle ? detallePedido.producto.talle : "");
}