import { Component,EventEmitter,Input, Output } from '@angular/core';
import {  OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
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
import { Estado } from '../../pages/pedidos-page/estado.enum';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}


@Component({
  selector: 'app-pedidos-dialog',
  standalone: true,
  imports: [FormsModule, TableModule, TagModule, IconFieldModule, InputTextModule, 
    InputIconModule, MultiSelectModule, DropdownModule, HttpClientModule, CommonModule, 
    SpeedDialModule, DialogModule, AutoCompleteModule, CalendarModule,InputNumberModule,CheckboxModule],
  templateUrl: './pedidos-dialog.component.html',
  styleUrl: './pedidos-dialog.component.css'
})
export class PedidosDialogComponent {
  
  @Input()  selectedPedido:any = null
  @Input()  estadoOptions!: { label: any, value: any }[]
  listaFiltrada:any = []
  showDialog:boolean = false
  @Input()  modelosDisponibles:any[] = [] 
  isNuevoPedido:boolean = true

  ngOnInit() {
    
  }

  getTitulo(){
    return this.isNuevoPedido ? 'Nuevo Pedido': 'Editar Pedido'
    
  }

  colorEstado(estado: Estado): any | undefined {
    switch (estado) {
        case Estado.NuevoPedido:
            return '#014811';
        case Estado.PagoPendiente:
            return '#644200';
        case Estado.EnvioPendiente:
            return '#77791d';
        case Estado.Entregado:
            return '#005176';
        case Estado.Cancelado:
            return '#460000';

        case Estado.RetiroPendiente:
            return '#644200';

        case Estado.SinStock:
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