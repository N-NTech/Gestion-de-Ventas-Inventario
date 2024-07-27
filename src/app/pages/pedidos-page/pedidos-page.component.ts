import { Component, OnInit } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Estado } from './estado.enum';

@Component({
    selector: 'table-filter-basic-demo',
    templateUrl: 'pedidos-page.component.html',
    styleUrl:'pedidos-page.component.css', 
    standalone: true,
    imports: [FormsModule,TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, DropdownModule, HttpClientModule, CommonModule]
})

export class PedidosPageComponent implements OnInit {
    
  Estado = Estado;
  estadoSeleccionado: Estado | null = null;

  estadoOptions!:any []
  
  pedidos = [
      {
          id: 1,
          nombre: 'Nicolás Arcamone',
          estado: Estado.NuevoPedido,
          producto: 'Nike- Jordan hight - Rosa y Negro - 45',
          fecha: '11/02/2024',
          precio: '$23.000',
          envio: 'Caballito'
      },
      {
          id: 2,
          nombre: 'Nahuel Monje',
          estado: Estado.Cancelado,
          producto: 'Puma - Suede Xl - Negro y Blanco - 40',
          fecha: '10/03/2024',
          precio: '$30.000',
          envio: 'Caballito'
      }
  ];

  

  constructor() {
    
  }


  ngOnInit() {
    this.estadoOptions = [
              { label: 'Nuevo Pedido', value: Estado.NuevoPedido },
              { label: 'Pago Pendiente', value: Estado.PagoPendiente },
              { label: 'Envío Pendiente', value: Estado.EnvioPendiente },
              { label: 'Entregado', value: Estado.Entregado },
              { label: 'Cancelado', value: Estado.Cancelado }
          ]
  }

  getSeverity(estado: Estado): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    switch (estado) {
        case Estado.NuevoPedido:
            return 'success';
        case Estado.PagoPendiente:
            return 'warning';
        case Estado.EnvioPendiente:
            return 'warning';
        case Estado.Entregado:
            return 'success';
        case Estado.Cancelado:
            return 'danger';
        default:
            return undefined; 
        }
    }

    

}