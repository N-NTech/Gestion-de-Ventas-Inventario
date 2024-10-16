import { Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
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
import { PedidosDialogComponent } from '../../components/pedidos-dialog/pedidos-dialog.component';
import { PedidosService } from '../../services/pedidos.service';


@Component({
    selector: 'table-filter-basic-demo',
    templateUrl: 'pedidos-page.component.html',
    styleUrl: 'pedidos-page.component.css',
    standalone: true,
    imports: [FormsModule, TableModule, TagModule, IconFieldModule, InputTextModule, 
        InputIconModule, MultiSelectModule, DropdownModule, HttpClientModule, CommonModule, 
        SpeedDialModule, DialogModule, AutoCompleteModule, CalendarModule,InputNumberModule,CheckboxModule,PedidosDialogComponent]
})

export class PedidosPageComponent implements OnInit {
    
    
    estadoSeleccionado: Estado | null = null;

    estadoOptions!:string[]
    
    @ViewChild(PedidosDialogComponent)
    dialog!:PedidosDialogComponent;
    
    
    selectedPedido = {
        id: null,
        nombre: '',
        estado: 'NUEVO PEDIDO',
        producto: '',
        fecha: new Date(),
        precio: 0,
        lugar: '',
        esEnvio: false
    }

    numeroRandom = 22

    modelosDisponibles = ["Nike", "Adidas", "Puma", "New Balance", "Converse", "Reebok", "Vans", "Fila", "Skechers", "Under Armour"]
    
    pedidos = []

    // pedidos = [
    //     {
    //         id: 1,
    //         nombre: 'Nicolás Arcamone',
    //         estado: Estado.NuevoPedido,
    //         producto: 'Nike- Jordan hight - Rosa y Negro - 45',
    //         fecha: new Date(2024, 4 - 1, 11),
    //         precio: 23000,
    //         lugar: 'Caballito',
    //         esEnvio: false
    //     },
    //     {
    //         id: 2,
    //         nombre: 'María González',
    //         estado: Estado.PagoPendiente,
    //         producto: 'Adidas UltraBoost - Negro - 42',
    //         fecha: new Date(2024, 4 - 1, 12),
    //         precio: 19.000,
    //         lugar: 'Palermo',
    //         esEnvio: true
    //     },
    //     {
    //         id: 3,
    //         nombre: 'Juan Pérez',
    //         estado: Estado.EnvioPendiente,
    //         producto: 'Puma RS-X - Azul - 44',
    //         fecha: new Date(2024, 4 - 1, 11),
    //         precio: 21.000,
    //         lugar: 'Belgrano',
    //         esEnvio: false
    //     },
    //     {
    //         id: 4,
    //         nombre: 'Laura Martínez',
    //         estado: Estado.Entregado,
    //         producto: 'New Balance 574 - Gris - 40',
    //         fecha: new Date(2024, 4 - 1, 14),
    //         precio: 25.000,
    //         lugar: 'Recoleta',
    //         esEnvio: false
    //     },
    //     {
    //         id: 5,
    //         nombre: 'Carlos Fernández',
    //         estado: Estado.Cancelado,
    //         producto: 'Converse Chuck Taylor - Blanco - 43',
    //         fecha: new Date(2024, 4 - 1, 15),
    //         precio: 15.000,
    //         lugar: 'San Telmo',
    //         esEnvio: true
    //     },
    //     {
    //         id: 6,
    //         nombre: 'Carlos Fernández',
    //         estado: Estado.RetiroPendiente,
    //         producto: 'Converse Chuck Taylor - Blanco - 43',
    //         fecha: new Date(2024, 4 - 1, 15),
    //         precio: 15.000,
    //         lugar: 'San Telmo',
    //         esEnvio: true
    //     },
    //     {
    //         id: 7,
    //         nombre: 'Carlos Fernández',
    //         estado: Estado.SinStock,
    //         producto: 'Converse Chuck Taylor - Blanco - 43',
    //         fecha: new Date(2024, 4 - 1, 15),
    //         precio: 5.000,
    //         lugar: 'San Telmo',
    //         esEnvio: true
    //     }
    // ];

    constructor(
        private readonly pedidosService: PedidosService
    ) {

    }


    ngOnInit() {

        this.pedidosService.getAllPedidos().subscribe((pedidos: any) => {
            console.log(pedidos)
            this.pedidos = pedidos;
        })

        this.estadoOptions = [
            'NUEVO PEDIDO',
            'PAGO PENDIENTE',
            'RETIRO PENDIENTE',
            'ENVIO PENDIENTE',
            'ENTREGADO',
            'CANCELADO',
            'SIN STOCK'
        ];
    }

    getSeverity(estado: string): any | undefined {
        switch (estado) {
            case 'NUEVO PEDIDO':
                return 'success';
            case 'PAGO PENDIENTE':
                return 'contrast';
            case 'ENVÍO PENDIENTE':
                return 'warning';
            case 'ENTREGADO':
                return 'primary';
            case 'CANCELADO':
                return 'danger';

            case 'RETIRO PENDIENTE':
                return 'warning';

            case 'SIN STOCK':
                return 'secondary';

            default:
                return undefined;
        }
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

    cambiarEstado(pedido: any) {
        const estados = this.estadoOptions;
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
        this.dialog.showDialog = true
        this.dialog.isNuevoPedido = false
        console.log(pedido)
    }

    eliminarPedido(pedido: any) {
        console.log("Eliminar pedido", pedido)
    }


    nuevoPedido(){

        this.selectedPedido = {
            id: null,
            nombre: '',
            estado: 'NUEVO PEDIDO',
            producto: '',
            fecha: new Date(),
            precio: 0,
            lugar: '',
            esEnvio: false
        }
        this.dialog.showDialog = true
        this.dialog.isNuevoPedido = true        
    }


      filter(event: any) {
        console.log(event);
        return this.pedidos;
    }

    

}


