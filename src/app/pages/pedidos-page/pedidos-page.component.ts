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
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'table-filter-basic-demo',
    templateUrl: 'pedidos-page.component.html',
    styleUrl: 'pedidos-page.component.css',
    standalone: true,
    imports: [FormsModule, TableModule, TagModule, IconFieldModule, InputTextModule, 
        InputIconModule, MultiSelectModule, DropdownModule, HttpClientModule, CommonModule, 
        SpeedDialModule, DialogModule, AutoCompleteModule, CalendarModule,InputNumberModule,CheckboxModule]
})

export class PedidosPageComponent implements OnInit {
    saveProduct() {
        throw new Error('Method not implemented.');
    }
    hideDialog() {
        throw new Error('Method not implemented.');
    }




    Estado: Estado | null = null;
    estadoSeleccionado: Estado | null = null;

    estadoOptions!: { label: any, value: any }[]

    showDialog = false;

    selectedPedido = {
        id: 1,
        nombre: 'Nicolás Arcamone',
        estado: Estado.NuevoPedido,
        producto: 'Nike- Jordan hight - Rosa y Negro - 45',
        fecha: new Date(2024, 4 - 1, 11),
        precio: 23000,
        lugar: 'Caballito',
        esEnvio: false
    };

    numeroRandom = 22

    modelosDisponibles = ["Nike", "Adidas", "Puma", "New Balance", "Converse", "Reebok", "Vans", "Fila", "Skechers", "Under Armour"]
    listaFiltrada: any[] = [];


    pedidos = [
        {
            id: 1,
            nombre: 'Nicolás Arcamone',
            estado: Estado.NuevoPedido,
            producto: 'Nike- Jordan hight - Rosa y Negro - 45',
            fecha: new Date(2024, 4 - 1, 11),
            precio: 23000,
            lugar: 'Caballito',
            esEnvio: false
        },
        {
            id: 2,
            nombre: 'María González',
            estado: Estado.PagoPendiente,
            producto: 'Adidas UltraBoost - Negro - 42',
            fecha: new Date(2024, 4 - 1, 12),
            precio: 19.000,
            lugar: 'Palermo',
            esEnvio: true
        },
        {
            id: 3,
            nombre: 'Juan Pérez',
            estado: Estado.EnvioPendiente,
            producto: 'Puma RS-X - Azul - 44',
            fecha: new Date(2024, 4 - 1, 11),
            precio: 21.000,
            lugar: 'Belgrano',
            esEnvio: false
        },
        {
            id: 4,
            nombre: 'Laura Martínez',
            estado: Estado.Entregado,
            producto: 'New Balance 574 - Gris - 40',
            fecha: new Date(2024, 4 - 1, 14),
            precio: 25.000,
            lugar: 'Recoleta',
            esEnvio: false
        },
        {
            id: 5,
            nombre: 'Carlos Fernández',
            estado: Estado.Cancelado,
            producto: 'Converse Chuck Taylor - Blanco - 43',
            fecha: new Date(2024, 4 - 1, 15),
            precio: 15.000,
            lugar: 'San Telmo',
            esEnvio: true
        },
        {
            id: 6,
            nombre: 'Carlos Fernández',
            estado: Estado.RetiroPendiente,
            producto: 'Converse Chuck Taylor - Blanco - 43',
            fecha: new Date(2024, 4 - 1, 15),
            precio: 15.000,
            lugar: 'San Telmo',
            esEnvio: true
        },
        {
            id: 7,
            nombre: 'Carlos Fernández',
            estado: Estado.SinStock,
            producto: 'Converse Chuck Taylor - Blanco - 43',
            fecha: new Date(2024, 4 - 1, 15),
            precio: 5.000,
            lugar: 'San Telmo',
            esEnvio: true
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
                return 'secondary';

            default:
                return undefined;
        }
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

    cambiarEstado(pedido: any) {
        const estados = Object.values(Estado)
        let seguir = true
        estados.forEach(estado => {
            if (pedido.estado == estado && seguir) {
                let indexDelEstadoActual = estados.indexOf(pedido.estado)
                pedido.estado = indexDelEstadoActual < estados.length - 1 ? estados[indexDelEstadoActual + 1] : estados[0]
                seguir = false
            }
        })
    }

    editarPedido(pedido: any) {
        this.selectedPedido = pedido;
        this.showDialog = true;
        console.log(pedido)
    }

    eliminarPedido(pedido: any) {
        console.log("Eliminar pedido", pedido)
    }

    filtrarModelos(event: AutoCompleteCompleteEvent) {
        const query = event.query.toLowerCase();
        this.listaFiltrada = this.modelosDisponibles.filter(modelo => modelo.toLowerCase().includes(query));
      }

      filterEstado(event: any) {
        console.log(event);
        return this.pedidos;
    }



}


