import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { getDatosCliente, getPedidosList } from '../../../shared/pedido-store';
import { DetallePedido } from '../../../shared/Interfaces';
import { getNombreLargoDetallePedido } from '../../../utils/pedidosUtils';
import { newPedido } from '../../../shared/Interfaces';

@Component({
  selector: 'app-confirmar-pedido',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './confirmarPedido.component.html',
  styleUrls: ['./confirmarPedido.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmarPedidoComponent {

  datosCliente: Signal<any> = getDatosCliente;
  datosPedido: Signal<DetallePedido[]> = computed(() => getPedidosList());

  ngOnInit() {
    console.log("NgOnInit Confirmar Pedido");
  }

  getNombre(detallePedido: DetallePedido) {
    return getNombreLargoDetallePedido(detallePedido);
  } 

  confirmarPedido() {

      //TODO: Modificar backend para poder pedir cantidad de productos

    let newPedido: newPedido = {
        cliente: {
            nombre: this.datosCliente().get('nombre'),
            telefono: this.datosCliente().get('telefono'),
        },
        fechaCreacion: new Date().toISOString(),
        fechaDespacho: new Date().toISOString(),
        metodoDePago: this.datosCliente().get('metodoPago'),
        estado: this.datosCliente().get('estado'),
        productos: this.datosPedido(), //TODO revisar si este atributo debe ser DetallePedido[] o Producto[],
        precioVenta: this.datosCliente().get('precioVenta'),
        precioCosto: this.datosCliente().get('precioCosto'),
        isEnvio: this.datosCliente().get('envio'),
        direccion: this.datosCliente().get('direccion'),
    }

    console.log("Nuevo Pedido", newPedido);
    
}
}

interface datosClienteForm {
  nombre: string,
  telefono: string,
  direccion: string,
  envio: boolean,
  precioCosto: number,
  precioVenta: number,
  metodoPago: string
}


