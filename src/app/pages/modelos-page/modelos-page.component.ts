import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal, ViewChild, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';

import { ModeloCardComponent } from '../../components/modelo-card/modelo-card.component';
import { getPedidosList } from '../../shared/pedido-store';

import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import { DetallePedido, newPedido, Producto } from '../../shared/Interfaces';
import { Modelo } from '../../shared/Interfaces';
import { modelosMock } from '../../shared/modelos-mock';
import { MatListModule } from '@angular/material/list';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { eliminarProductoPedido, calcularTotalPedido} from '../../shared/pedido-store';
import { ModelosService } from '../../services/modelos.service';

import {FormBuilder, Validators} from '@angular/forms';
import {MatStep, MatStepperModule} from '@angular/material/stepper';

import { DatosPedidoFormComponent } from './datosPedidoForm/datosPedidoForm.component';
import { ConfirmarPedidoComponent } from './confirmarPedido/confirmarPedido.component';





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
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatStepperModule,
        DatosPedidoFormComponent,
        ConfirmarPedidoComponent
    ],
    providers: [ModelosService],
    styleUrl: './modelos-page.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: `./modelos-page.component.html`
})
export class ModelosPageComponent {

    private modelosService = inject(ModelosService);
    modelResource = this.modelosService.modelResourcePublic;
    pedidoList: Signal<DetallePedido[]>= computed(() => getPedidosList());
    PedidoSideOpened = computed(() => getPedidosList().length > 0);

    //Variables para el stepper
    @ViewChild(DatosPedidoFormComponent) formCliente!: DatosPedidoFormComponent;
    formClienteControl: FormGroup | undefined;
    @ViewChild('StepUno') stepUno!: MatStep;
  
    ngAfterViewInit() {
      //Se asigna en este momento para evitar error de que el formCliente no esta definido
      this.formClienteControl = this.formCliente.datosPedidosForm;
      this.stepUno.completed = false;

    }

    calcularTotal() : number {
        this.ValidarPasoUno()
        return calcularTotalPedido();
    }

    eliminarProducto(pedidoId: number) {
        eliminarProductoPedido(pedidoId);
    }

    ValidarPasoUno() {
        if(this.stepUno){
            this.stepUno.completed = this.pedidoList().length > 0 ? true : false; 
        }
    }


  }