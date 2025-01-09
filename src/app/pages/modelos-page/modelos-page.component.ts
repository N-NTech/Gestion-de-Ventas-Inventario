import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';

import { ModeloCardComponent } from '../../components/modelo-card/modelo-card.component';
import { getPedidosList } from '../../shared/pedido-store';

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
import { eliminarProductoPedido, calcularTotalPedido} from '../../shared/pedido-store';
import { ModelosService } from '../../services/modelos.service';





@Component({
    selector: 'app-modelos-page',
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
    providers: [ModelosService],
    styleUrl: './modelos-page.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: `./modelos-page.component.html`
})
export class ModelosPageComponent {
  
    constructor() { }

    modelosService = inject(ModelosService);
    
    modelList = this.modelosService.modelos;
        
    pedidoList: Signal<DetallePedido[]>= computed(() => getPedidosList());
    
    PedidoSideOpened = computed(() => getPedidosList().length > 0);

    ngOnInit() {
      console.log("Lista de modelos", this.modelList);
    }

    calcularTotal() : number {
        return calcularTotalPedido();
    }

    eliminarProducto(pedidoId: number) {
        eliminarProductoPedido(pedidoId);
    }

    continuarPedido() {
        console.log('Compra finalizada');
        console.log(getPedidosList());
    }

  }