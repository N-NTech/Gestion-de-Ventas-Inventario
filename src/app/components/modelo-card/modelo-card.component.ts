import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface Modelo {
  id: number;
  nombre: string;
  marca: { id: number, nombre: string };
  variante: string;
  imagen: string;
  precioVenta: number;
  talles: number[];
}

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
            @for (talle of modelo.talles; track modelo.id) {
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
  cantidad: any;
  talle: any;

  constructor(private _snackBar: MatSnackBar) {}

  addToPedido() {
    console.log(this.modelo, this.cantidad, this.talle);
    
    this._snackBar.open(`Agregado al pedido: ${this.modelo.marca.nombre} ${this.modelo.nombre} ${this.modelo.variante} ${this.talle} (x${this.cantidad})`, 'X', {
      duration: 500000,
      panelClass: ['custom-snackbar'],
    });

    this.cantidad = undefined;
    this.talle = undefined;

    //TODO: Implementar lógica para agregar al pedido, implementar ngrx Store?
    // this.pedidoService.addToPedido(this.modelo, this.cantidad, this.talle);
  }

}
