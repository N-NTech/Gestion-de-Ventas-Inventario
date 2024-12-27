import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, WritableSignal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DetallePedido, Producto } from '../../shared/Interfaces';
import { agregarProductoCarrito, pedidoList } from '../../shared/carrito-store';
import { Modelo } from '../../shared/Interfaces';

@Component({
  selector: 'app-modelo-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./modelo-card.component.css'],
  template: `
    <mat-card class="product-card">
      <img mat-card-image [src]="modelo.imagen" [alt]="modelo.nombre">
      
      <mat-card-header>
        <mat-card-title>{{ modelo.marca.nombre + " " + modelo.nombre}}</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <mat-card-subtitle>{{modelo.variante }}</mat-card-subtitle>
        <p>{{ modelo.precioVenta | currency }}<p>
        <div class="d-flex justify-content-around align-items-center mt-3">
          <mat-form-field class="col-5">
            <mat-label>Talle</mat-label>
            <mat-select [(ngModel)]="talle">
            @for (talle of listaTalles; track modelo.id) {
                <mat-option [value]="talle">
                    {{talle}}
                </mat-option>
            }
            </mat-select>
          </mat-form-field>

          <mat-form-field class="col-5">
            <mat-label>Cantidad</mat-label>
            <mat-select [(ngModel)]="cantidad">
              @for (num of [1,2,3]; track num) {
                <mat-option [value]="num">
                  {{num}}
                </mat-option>
              }
            </mat-select>
          </mat-form-field>
        </div>

      </mat-card-content>

      <mat-card-actions align="start">
        <button mat-button color="primary" (click)="addToPedido()" [disabled]="!cantidad || !talle">
          <mat-icon>shopping_cart</mat-icon>
          Agregar al pedido
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class ModeloCardComponent {
  @Input() modelo!: Modelo;
  listaTalles: (number | undefined)[] | undefined;
  cantidad: number = 1;
  talle: number | undefined;

  pedidoList: WritableSignal<DetallePedido[]> = pedidoList;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.listaTalles = this.modelo.productos?.map(productos => productos.talle)
  }

  addToPedido() {

    let producto: Producto = {
      id: 1,
      modelo: this.modelo,
      talle: this.talle,
      categoria: "URBANAS",
      stock: 1,
    }

    console.log(this.modelo, this.cantidad, this.talle);

    console.log("Producto a agregar:",producto);
    agregarProductoCarrito(producto, this.cantidad);
    
    this._snackBar.open(`Agregado al pedido: ${this.modelo.marca.nombre} ${this.modelo.nombre} ${this.modelo.variante} ${this.talle} (x${this.cantidad})`, 'X', {
      duration: 5000,
      panelClass: ['custom-snackbar'],
    });

    this.talle = undefined;
    this.cantidad = 1;

  }

}
