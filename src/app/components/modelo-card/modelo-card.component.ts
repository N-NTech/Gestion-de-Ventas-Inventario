import { ChangeDetectionStrategy, Component, Input, Signal, ViewEncapsulation, WritableSignal, computed, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DetallePedido, Producto } from '../../shared/Interfaces';
import { agregarProductoPedido, getPedidosList } from '../../shared/pedido-store';
import { Modelo } from '../../shared/Interfaces';

@Component({
    selector: 'app-modelo-card',
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
            <mat-select [(ngModel)]="selectedTalle">
            @for (talle of listaTalles; track talle) {
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
        <button mat-button color="primary" (click)="addToPedido()" [disabled]="!cantidad || !selectedTalle()">
          <mat-icon>shopping_cart</mat-icon>
          Agregar al pedido
        </button>
      </mat-card-actions>
    </mat-card>
  `
})
export class ModeloCardComponent {
  @Input() modelo!: Modelo;
  listaTalles: (number | undefined)[] | undefined;
  cantidad: number = 1;
  selectedTalle: WritableSignal<number | undefined> = signal(undefined);

  selectedProducto: Signal<Producto | undefined> = computed(() => 
    Object.assign(
      this.modelo.productos!.find(producto => producto.talle === this.selectedTalle())!, 
      { modelo: this.modelo }
    ));

  pedidoList: Signal<DetallePedido[]>= computed(() => getPedidosList());

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.listaTalles = this.modelo.productos?.map(productos => productos.talle).sort((a, b) => (a || 0) - (b || 0));
  }

  addToPedido() {

    const productoParaPedido = structuredClone(this.selectedProducto()!);
    productoParaPedido.modelo = { ...productoParaPedido.modelo, productos: [] };

    agregarProductoPedido(productoParaPedido, this.cantidad);

    this._snackBar.open(`Agregado al pedido: ${this.modelo.marca.nombre} ${this.modelo.nombre} ${this.modelo.variante} ${this.selectedTalle()} (x${this.cantidad})`, 'X', {
      duration: 5000,
      panelClass: ['custom-snackbar'],
    });

    this.selectedTalle.set(undefined);
    this.cantidad = 1;

  }

}
