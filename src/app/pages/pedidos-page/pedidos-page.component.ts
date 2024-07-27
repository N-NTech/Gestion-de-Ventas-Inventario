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

    
  Estado: Estado | null = null;
  estadoSeleccionado: Estado | null = null;

  estadoOptions!: {label:any,value:any}[]
  
  pedidos =  [
    {
      id: 1,
      nombre: 'Nicolás Arcamone',
      estado: Estado.NuevoPedido,
      producto: 'Nike- Jordan hight - Rosa y Negro - 45',
      fecha: new Date(2024,4-1,11),
      precio: '$23.000',
      envio: 'Caballito'
    },
    {
      id: 2,
      nombre: 'María González',
      estado: Estado.PagoPendiente,
      producto: 'Adidas UltraBoost - Negro - 42',
      fecha: new Date(2024,4-1,12),
      precio: '$19.000',
      envio: 'Palermo'
    },
    {
      id: 3,
      nombre: 'Juan Pérez',
      estado: Estado.EnvioPendiente,
      producto: 'Puma RS-X - Azul - 44',
      fecha: new Date(2024,4-1,11),
      precio: '$21.000',
      envio: 'Belgrano'
    },
    {
      id: 4,
      nombre: 'Laura Martínez',
      estado: Estado.Entregado,
      producto: 'New Balance 574 - Gris - 40',
      fecha: new Date(2024,4-1,14),
      precio: '$25.000',
      envio: 'Recoleta'
    },
    {
      id: 5,
      nombre: 'Carlos Fernández',
      estado: Estado.Cancelado,
      producto: 'Converse Chuck Taylor - Blanco - 43',
      fecha: new Date(2024,4-1,15),
      precio: '$15.000',
      envio: 'San Telmo'
    },
    {
        id: 6,
        nombre: 'Carlos Fernández',
        estado: Estado.RetiroPendiente,
        producto: 'Converse Chuck Taylor - Blanco - 43',
        fecha: new Date(2024,4-1,15),
        precio: '$15.000',
        envio: 'San Telmo'
      },
      {
        id: 7,
        nombre: 'Carlos Fernández',
        estado: Estado.SinStock,
        producto: 'Converse Chuck Taylor - Blanco - 43',
        fecha: new Date(2024,4-1,15),
        precio: '$15.000',
        envio: 'San Telmo'
      }
  ];

  

  constructor() {
    
  }


  ngOnInit() {
    this.estadoOptions = [
              { label: 'Nuevo Pedido', value: Estado.NuevoPedido },
              { label: 'Pago Pendiente', value: Estado.PagoPendiente },
              { label: 'Retiro Pendiente', value: Estado.RetiroPendiente },
              { label: 'Envío Pendiente', value: Estado.EnvioPendiente },
              { label: 'Entregado', value: Estado.Entregado },
              { label: 'Cancelado', value: Estado.Cancelado },
              { label: 'Sin Stock', value: Estado.SinStock },

          ]
  }

  getSeverity(estado: Estado): any | undefined {
    switch (estado) {
        case Estado.NuevoPedido:
            return 'success';
        case Estado.PagoPendiente:
            return 'contrast';
        case Estado.EnvioPendiente:
            return 'warning';
        case Estado.Entregado:
            return 'primary';
        case Estado.Cancelado:
            return 'danger';

        case Estado.RetiroPendiente:
            return 'warning';

        case Estado.SinStock:
            return 'test';

        default:
            return undefined; 
        }
    }

    colorEstado(estado: Estado): any | undefined {
      switch (estado) {
        case Estado.NuevoPedido:
            return 'darkgreen';
        case Estado.PagoPendiente:
            return 'darkorange';
        case Estado.EnvioPendiente:
            return 'darkyellow';
        case Estado.Entregado:
            return 'darklightblue';
        case Estado.Cancelado:
            return 'darkred';

        case Estado.RetiroPendiente:
            return 'darkorange';

        case Estado.SinStock:
            return 'gray';

        default:
            return undefined; 
        }
    }
  

    filter(event:any){
        console.log(event);
        return this.pedidos;
    }

    

}