import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { getDatosCliente, getPedidosList, PedidosStore, reiniciarPedidoState } from '../../../shared/pedido-store';
import { DetallePedido } from '../../../shared/Interfaces';
import { getNombreLargoDetallePedido } from '../../../utils/pedidosUtils';
import { newPedido } from '../../../shared/Interfaces';
import { Router } from '@angular/router';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-pedido',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule, MatButtonModule],
  templateUrl: './confirmarPedido.component.html',
  styleUrls: ['./confirmarPedido.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmarPedidoComponent {

  router = inject(Router);
  pedidosStore = inject(PedidosStore);	
  datosCliente: Signal<any> = getDatosCliente;
  datosPedido: Signal<DetallePedido[]> = computed(() => getPedidosList());

  readonly dialog = inject(MatDialog);

  openConfirmCancelDialog() {
    this.dialog.open(CancelarPedidoDialog);
  }

  openConfirmPedidoDialog() {
    this.dialog.open(PedidoConfirmadoDialog);
  }

  ngOnInit() {
    console.log("NgOnInit Confirmar Pedido");
  }

  getNombre(detallePedido: DetallePedido) {
    return getNombreLargoDetallePedido(detallePedido);
  } 

  confirmarPedido() {

    console.log("Confirmar Pedido");

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

    console.log("Pegandole al backend", newPedido);

    this.pedidosStore.postNewPedido(newPedido).subscribe({
      next: (res) => {
        console.log("Pedido creado", res);
        this.openConfirmPedidoDialog();
      },
      error: (err) => {
        console.error("Error al crear pedido", err);
      }
    });   
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

@Component({
  selector: 'cancelar-pedido-dialog',
  imports: [MatDialogModule ,MatButtonModule, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogActions],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>¿Cancelar pedido?</h2>
      <mat-dialog-content>
        ¿Está seguro que desea cancelar el pedido actual? Esta acción no se puede deshacer.
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button mat-dialog-close>No</button>
        <button mat-button color="warn" mat-dialog-close cdkFocusInitial (click)="cancelarPedido()">Sí, cancelar</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    mat-dialog-actions {
      display: flex;
      justify-content: flex-end;
    }

    .dialog-container{
      background-color: #181e38;
    }
   
  `],
})
export class CancelarPedidoDialog {
  readonly dialogRef = inject(MatDialogRef<CancelarPedidoDialog>);
  private router = inject(Router);
  
  cancelarPedido() {
    reiniciarPedidoState()
    this.router.navigate(['/']);
  }
  
}

@Component({
  selector: 'pedido-confirmado-dialog',
  imports: [MatDialogModule ,MatButtonModule, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogActions],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>Pedido Confirmado</h2>
      <mat-dialog-content>
        El pedido fue creado exitosamente
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button mat-dialog-close cdkFocusInitial>Aceptar</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    mat-dialog-actions {
      display: flex;
      justify-content: flex-end;
    }

    .dialog-container{
      background-color: #181e38;
    }

    button  {
      background-color:rgb(0, 167, 22);
      color: white;
    }
   
  `],
})
export class PedidoConfirmadoDialog {
  readonly dialogRef = inject(MatDialogRef<CancelarPedidoDialog>);
  private router = inject(Router);
  
  ngOnDestroy() {
    reiniciarPedidoState()
    this.router.navigate(['/']);
  }
  
}


