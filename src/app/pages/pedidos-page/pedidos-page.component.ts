import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Estado } from '../../shared/enums/estado.enum';
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
import { Router } from '@angular/router';
import { DetallePedido, newPedido } from '../../shared/Interfaces';
import { getNombreLargoDetallePedido } from '../../utils/pedidosUtils';
import {MatMenuModule} from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    productoModelo?: string;
    productoMarca?: string;
    productoVariante?: string;
    productoTalle?: string;
    productoCategoria?: string;
    precioVenta: string;
    precioCosto: string;
    isEnvio: boolean;
    cantidad?: number;
  }


@Component({
    selector: 'pedidos-page',
    templateUrl: 'pedidos-page.component.html',
    styleUrl: 'pedidos-page.component.css',
    imports: [FormsModule,
        CommonModule, 
        MatCardModule, 
        MatIconModule, 
        MatPaginatorModule,
        MatSortModule, 
        MatTableModule,
        MatInputModule, 
        MatFormFieldModule, 
        MatPaginator, 
        MatSort, MatIcon,
        MatButtonModule, 
        MatTooltipModule, 
        MatDialogModule, 
        MatSelectModule,
        MatChipsModule,
        MatMenuModule,
        MatSnackBarModule
    ]
})

export class PedidosPageComponent implements OnInit {

    private pedidosService = inject(PedidosService);
    private router = inject(Router);
    private _snackBar = inject(MatSnackBar);

    displayedColumns: string[] = ['id', 'clienteNombre', 'productNombreList', 'fechaCreacion', 'estado', 'direccion', 'Editar'];

    estadoSeleccionado: Estado | null = null;

    estados: Estado[] = Object.values(Estado);

    inputFilter: string = '';

    selectedEstado: string | undefined;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator | null;

    @ViewChild(MatSort)
    sort!: MatSort | null;

    pedidos: newPedido[] = [];

    dataSource!: MatTableDataSource<PedidoMatTable>;

    ngOnInit() {

        this.pedidosService.getAllPedidos().subscribe({
            next: (pedidos: newPedido[]) => {
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
  
      if (selectedEstado == 'TODOS') {
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

    editarPedido(pedido: newPedido) {
        console.log("Editar pedido", pedido)
    }

    eliminarPedido(pedido: newPedido) {
        console.log("Eliminar pedido", pedido)
    }

    nuevoPedido() {
        this.router.navigate(['/modelos']);
    }

    filter(event: any) {
        console.log(event);
        return this.pedidos;
    }

    getNombre(detallePedido: DetallePedido) {
        return getNombreLargoDetallePedido(detallePedido);
    }
    
    disponibilidadDetalleClass(detalle: DetallePedido) {
        let clase = this.productoDispobible(detalle) ? 'color-green' : 'color-red';
        return clase;
    }

    productoDispobible(detalle: DetallePedido) {
        //TODO: Implementar metodo para revisar el stock y la disponibilidad de un producto en especifico considerando talle y cantidad
        if(detalle.producto?.modelo?.variante == 'Rojo y Negro con charol') {
            return false;
        } else {
            return true
        }
    }

    cambiarEstado(pedidoRow: any, estado: Estado) {

        const pedido = this.pedidos.find(pedido => pedido.id == pedidoRow.id)

        if (pedido){

            pedido.estado = estado
            pedidoRow.estado = estado

            this.pedidosService.putPedido(pedido).subscribe({
                next: (response) => {
                    console.log('Estado actualizado:', response);
                    this._snackBar.open(`Cambiado el estado del pedido ${pedido.id} a ${estado}`, 'X', {
                        duration: 5000,
                        panelClass: ['custom-snackbar'],
                      });
                },
                error: (error) => {
                    console.error('Error al actualizar estado:', error);
                }
            });
        }

    }



}


function pedidoToPedidoMatTable(pedido: any): PedidoMatTable {
  
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
      precioVenta: pedido.precioVenta,
      precioCosto: pedido.precioCosto,
      isEnvio: pedido.isEnvio,
      productList: pedido.detallePedido
    }
  
    if(pedido.detallePedido.length > 0){
      pedidoMatTable.productoModelo = pedido.detallePedido[0].producto?.modelo?.nombre
      pedidoMatTable.productoMarca = pedido.detallePedido[0].producto?.modelo?.marca?.nombre
      pedidoMatTable.productoVariante = pedido.detallePedido[0].producto?.modelo?.variante
      pedidoMatTable.productoTalle = pedido.detallePedido[0].producto?.talle
      pedidoMatTable.productoCategoria = pedido.detallePedido[0].producto?.categoria?.nombre
      pedidoMatTable.cantidad = pedido.detallePedido[0].cantidad
    }
  
    return pedidoMatTable
  }

