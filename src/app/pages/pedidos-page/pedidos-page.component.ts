import { Component, OnInit, viewChild, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { Estado } from '../../shared/enums/estado.enum';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { PedidosDialogComponent } from '../../components/pedidos-dialog/pedidos-dialog.component';
import { PedidosService } from '../../services/pedidos.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

export interface PedidoMatTable {
    id: string;
    clienteDNI: string;
    clienteNombre: string;
    telefono: string;
    direccion: string;
    estado: string;
    fechaCreacion: string;
    fechaDespacho: string;
    metodoDePago: string;
    productList: any[];
    productNombreList?: string[];
    productoModelo?: string;
    productoMarca?: string;
    productoVariante?: string;
    productoTalle?: string;
    productoCategoria?: string;
    precioVenta: string;
    precioCosto: string;
    isEnvio: boolean;
  }


@Component({
    selector: 'pedidos-page',
    templateUrl: 'pedidos-page.component.html',
    styleUrl: 'pedidos-page.component.css',
    standalone: true,
    imports: [FormsModule, TableModule, TagModule, IconFieldModule, InputTextModule,
        InputIconModule, MultiSelectModule, DropdownModule, HttpClientModule, CommonModule,
        SpeedDialModule, DialogModule, AutoCompleteModule, CalendarModule, InputNumberModule,
        CheckboxModule, PedidosDialogComponent, MatCardModule, MatIconModule, MatPaginatorModule,
        MatSortModule, MatTableModule,
        MatInputModule, MatFormFieldModule, MatPaginator, MatSort, MatIcon,
        MatButtonModule, MatTooltipModule, MatDialogModule, MatSelectModule,
        MatChipsModule
    ],
    // encapsulation: ViewEncapsulation.None
})

export class PedidosPageComponent implements OnInit {

    displayedColumns: string[] = ['id', 'clienteNombre', 'productNombreList', 'fechaCreacion', 'estado', 'direccion', 'Editar'];

    estadoSeleccionado: Estado | null = null;

    estados: Estado[] = Object.values(Estado);

    inputFilter: string = '';

    selectedEstado: string | undefined;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator | null;

    @ViewChild(MatSort)
    sort!: MatSort | null;

    @ViewChild(PedidosDialogComponent)
    dialog!: PedidosDialogComponent;


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

    pedidos: any[] = [];

    dataSource!: MatTableDataSource<PedidoMatTable>;


    constructor(
        private readonly pedidosService: PedidosService
    ) {

    }


    ngOnInit() {

        this.pedidosService.getAllPedidos().subscribe({
            next: (pedidos: any[]) => {
                console.log(pedidos);
                this.pedidos = pedidos;
                this.dataSource = new MatTableDataSource(this.pedidos.map(pedidoToPedidoMatTable));

                // if (this.dataSource) {
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                // }
            },
            error: (error) => {
                console.error(error);
            }
        });
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

//Filtra a nivel local
  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterEstado(selectedEstado: any) {

    console.log("Change", selectedEstado);
      
      this.inputFilter = '';
  
      if (selectedEstado == 'Todos') {
        this.pedidosService.getAllPedidos().subscribe({
          next: (pedidos: any[]) => {
            this.pedidos = pedidos;
            this.dataSource = new MatTableDataSource(this.pedidos.map(pedidoToPedidoMatTable));
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: (error) => {
            console.error(error);
          }
        });
      } else {
        //Filtra a nivel local
        const pedidosFiltrados = this.pedidos.filter(pedido => pedido.estado == selectedEstado)
        this.dataSource = new MatTableDataSource(pedidosFiltrados.map(pedidoToPedidoMatTable));
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
        const estados = this.estados;
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


    nuevoPedido() {

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


function pedidoToPedidoMatTable(pedido: any): PedidoMatTable {

    const listaDeNombres: string[] = pedido.productos.map((pedido:any) => `⚪${pedido.modelo?.nombre} ${pedido.modelo?.variante} ${pedido.talle}`).join("\n");
  
    const pedidoMatTable: PedidoMatTable =  {
      id: pedido.id.toString(),
      clienteDNI: pedido.cliente?.dni?.toString(),
      clienteNombre: pedido.cliente?.nombre,
      telefono: pedido.cliente?.telefono,
      direccion: pedido.direccion,
      estado: pedido.estado,
      fechaCreacion: pedido.fechaCreacion,
      fechaDespacho: pedido.fechaDespacho,
      metodoDePago: pedido.metodoDePago,
      productNombreList: listaDeNombres,
      precioVenta: pedido.precioVenta,
      precioCosto: pedido.precioCosto,
      isEnvio: pedido.isEnvio,
      productList: pedido.productos
    }
  
    if(pedido.productos.length > 0){
      pedidoMatTable.productoModelo = pedido.productos[0].modelo?.nombre
      pedidoMatTable.productoMarca = pedido.productos[0].modelo?.marca?.nombre
      pedidoMatTable.productoVariante = pedido.productos[0].modelo?.variante
      pedidoMatTable.productoTalle = pedido.productos[0].talle
      pedidoMatTable.productoCategoria = pedido.productos[0].categoria?.nombre
    }
  
    return pedidoMatTable
  }

