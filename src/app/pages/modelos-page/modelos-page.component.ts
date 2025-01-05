import { ChangeDetectionStrategy, Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';

import { ModeloCardComponent } from '../../components/modelo-card/modelo-card.component';
import { pedidoList } from '../../shared/carrito-store';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import { DetallePedido, Producto } from '../../shared/Interfaces';
import { Modelo } from '../../shared/Interfaces';
import { modelosMock } from '../../shared/modelos-mock';
import { MatListModule } from '@angular/material/list';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { eliminarProductoCarrito } from '../../shared/carrito-store';




@Component({
  selector: 'app-modelos-page',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule,
    MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ModeloCardComponent,
    MatListModule,
    MatDividerModule,
    MatIconModule
],
  styleUrl: './modelos-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./modelos-page.component.html`,
})
export class ModelosPageComponent {
  
    constructor() { }
    
    modelList: Modelo[] = modelosMock;
  
    pedidoList: WritableSignal<DetallePedido[]> = pedidoList;
    
    PedidoSideOpened = computed(() => pedidoList().length > 0);

    ngOnInit() {
      console.log("Lista de modelos", this.modelList);
    }

    calcularTotal() {
        return pedidoList().reduce((acc, detalle) => acc + detalle.producto.modelo.precioVenta * detalle.cantidad, 0);
    }

    eliminarProducto(pedidoId: number) {
        eliminarProductoCarrito(pedidoId);
    }

    finalizarPedido() {
        console.log('Compra finalizada');
        console.log(pedidoList());
    }

  }