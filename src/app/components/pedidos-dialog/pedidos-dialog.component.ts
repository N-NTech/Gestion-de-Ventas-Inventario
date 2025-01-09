import { Component,EventEmitter,Input, Output } from '@angular/core';
import {  OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import {} from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { Estado } from '../../shared/enums/estado.enum';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}


@Component({
  selector: 'app-pedidos-dialog',
  standalone: true,
  imports: [FormsModule, TableModule, TagModule, IconFieldModule, InputTextModule, 
    InputIconModule, MultiSelectModule, DropdownModule, 
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule, CommonModule, 
    SpeedDialModule, DialogModule, AutoCompleteModule, CalendarModule,InputNumberModule,CheckboxModule],
  templateUrl: './pedidos-dialog.component.html',
  styleUrl: './pedidos-dialog.component.css'
})
export class PedidosDialogComponent {
  
  @Input()  selectedPedido:any = null
  @Input()  estadoOptions!: string[]
  listaFiltrada:any = []
  showDialog:boolean = false
  @Input()  modelosDisponibles:any[] = [] 
  isNuevoPedido:boolean = true

  ngOnInit() {
    
  }

  getTitulo(){
    return this.isNuevoPedido ? 'Nuevo Pedido': 'Editar Pedido'
    
  }

  colorEstado(estado: string): any | undefined {
    switch (estado) {
        case 'NUEVO PEDIDO':
            return '#014811';
        case 'PAGO PENDIENTE':
            return '#644200';
        case 'ENVIO PENDIENTE':
            return '#77791d';
        case 'ENTREGADO':
            return '#005176';
        case 'CANCELADO':
            return '#460000';
        case 'RETIRO PENDIENTE':
            return '#644200';
        case 'SIN STOCK':
            return '#2d2d30';
        default:
            return undefined;
    }
}

    filtrarModelos(event: AutoCompleteCompleteEvent) {
      const query = event.query.toLowerCase();
      this.listaFiltrada = this.modelosDisponibles.filter(modelo => modelo.toLowerCase().includes(query));
    }

    saveProduct() {
      throw new Error('Method not implemented.');
    }
    hideDialog() {
      this.showDialog = false
    }




}