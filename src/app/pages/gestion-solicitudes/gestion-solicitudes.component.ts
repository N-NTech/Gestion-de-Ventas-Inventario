import { Component, inject, ViewChild } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';


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
  selector: 'app-gestion-solicitudes',
  standalone: true,
  imports: [MatCardModule,MatIconModule , MatPaginatorModule, MatSortModule, MatTableModule, MatInputModule, MatFormFieldModule, MatPaginator, MatSort, MatIcon, MatButtonModule, MatTooltipModule, MatDialogModule, MatSelectModule, FormsModule, MatSelectModule, CommonModule, TagModule, MatChipsModule],
  templateUrl: './gestion-solicitudes.component.html',
  styleUrl: './gestion-solicitudes.component.css'
})
export class GestionSolicitudesComponent {

  constructor(
    private readonly pedidosService: PedidosService,
  ) { }

  displayedColumns: string[] = ['id','clienteNombre', 'productNombreList', 'fechaCreacion', 'estado', 'direccion', 'Editar'];

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

  ngOnInit() {
    this.pedidosService.getAllPedidos().subscribe({
      next: (pedidos: any[]) => {
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
    pedidoMatTable.productoVariante = pedido.productos[0].modelo?.marca?.variante?.nombre
    pedidoMatTable.productoTalle = pedido.productos[0].talle
    pedidoMatTable.productoCategoria = pedido.productos[0].categoria?.nombre
  }

  return pedidoMatTable
}






