import { AfterViewInit, Component, inject, input, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PedidosService } from '../../services/pedidos.service';
import {TagModule} from 'primeng/tag';
import {MatChipsModule} from '@angular/material/chips';

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
  productoColor?: string;
  productoCategoria?: string;
  precioVenta: string;
  precioCosto: string;
  isEnvio: boolean;
}

@Component({
  selector: 'app-gestion-solicitudes',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule, MatSortModule, MatTableModule, MatInputModule, MatFormFieldModule, MatPaginator, MatSort, MatIcon, MatButtonModule, MatTooltipModule, MatDialogModule, MatSelectModule, FormsModule, MatSelectModule, CommonModule, TagModule, MatChipsModule],
  templateUrl: './gestion-solicitudes.component.html',
  styleUrl: './gestion-solicitudes.component.css'
})
export class GestionSolicitudesComponent {


  displayedColumns: string[] = ['Nombre', 'Producto', 'Fecha', 'Estado', 'Lugar', 'Editar'];

  pedidos: any[] = [];

  dataSource!: MatTableDataSource<PedidoMatTable>;

  estados: string[] = [
    'NUEVO PEDIDO',
    'PAGO PENDIENTE',
    'ENVIO PENDIENTE',
    'ENTREGADO',
    'CANCELADO',
    'RETIRO PENDIENTE',
    'SIN STOCK',
    'Todos'
];

  selectedEstado: string | undefined;

  inputFilter: string = '';


  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;

  @ViewChild(MatSort)
  sort!: MatSort | null;

  dialog = inject(MatDialog);


  constructor(
    private readonly pedidosService: PedidosService,
  ) {

    this.pedidosService.getAllPedidos().subscribe({ //Trae las solicitudes con estado pendiente
      next: (pedidos: any[]) => {
        this.pedidos = pedidos;
        this.dataSource = new MatTableDataSource(this.pedidos.map(PedidoToPedidoMatTable)); //Transforma los pedidos en PedidoMatTable para poder filtrar y ordenar
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error(error);
      }
    });

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
            this.dataSource = new MatTableDataSource(this.pedidos.map(PedidoToPedidoMatTable));
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
        this.dataSource = new MatTableDataSource(pedidosFiltrados.map(PedidoToPedidoMatTable));
      }
  }


  statusStyle(status: string) {
    switch (status) {
      case 'NUEVO PEDIDO':
        return 'background-color: color: #EB7D00; font-weight: bold;';
      case 'Rechazada':
        return 'color: red; font-weight: bold;';
      case 'Acreditada':
        return 'color: green; font-weight: bold;';
      case 'En Proceso':
        return 'color: blue; font-weight: bold;';
      default:
        return 'color: white; font-weight: bold;';
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


}

function PedidoToPedidoMatTable(pedido: any): PedidoMatTable {

  const listaDeNombres: string[] = pedido.productos.map((pedido:any) => `\n ⚪${pedido.modelo?.marca?.nombre} ${pedido.modelo?.nombre} ${pedido.color} ${pedido.talle}\n`).join("");

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
    pedidoMatTable.productoVariante = pedido.productos[0].modelo?.marca?.variante?.nombre
    pedidoMatTable.productoTalle = pedido.productos[0].talle
    pedidoMatTable.productoColor = pedido.productos[0].color
    pedidoMatTable.productoCategoria = pedido.productos[0].categoria?.nombre
  }

  return pedidoMatTable
}






