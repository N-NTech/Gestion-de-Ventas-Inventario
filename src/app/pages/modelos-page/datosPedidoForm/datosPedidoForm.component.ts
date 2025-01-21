import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { agregarDatosCliente } from '../../../shared/pedido-store';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-datos-pedido-form',
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  template: `
              <form [formGroup]="datosPedidosForm" class="form-grid">
      <mat-form-field>
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="nombre" required>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Teléfono</mat-label>
        <input matInput formControlName="telefono" required type="tel">
      </mat-form-field>

      <mat-form-field>
        <mat-label>Dirección</mat-label>
        <input matInput formControlName="direccion">
      </mat-form-field>
      
      <div class="checkbox-field">
        <mat-checkbox formControlName="envio">Envio</mat-checkbox>
      </div>

      <mat-form-field>
        <mat-label>Precio de Costo</mat-label>
        <input matInput formControlName="precioCosto" type="number" required currency>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Precio de Venta</mat-label>
        <input matInput formControlName="precioVenta" type="number" required>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Método de Pago</mat-label>
        <mat-select formControlName="metodoPago" required>
          <mat-option value="Efectivo">Efectivo</mat-option>
          <mat-option value="Transferencia">Transferencia</mat-option>
          <mat-option value="QR">QR</mat-option>
          <mat-option value="Link de pago">Link de pago</mat-option>
          <mat-option value="Tarjeta">Tarjeta</mat-option>

        </mat-select>
      </mat-form-field>
      
      <mat-form-field>
        <mat-label>Estado</mat-label>
        <mat-select formControlName="estado" required>
          @for (estado of estados; track estado) {
            <mat-option [value]="estado">{{estado}}</mat-option>
          }
        </mat-select>
      </mat-form-field>

    </form>
    `,
  styleUrl: './datosPedidoForm.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatosPedidoFormComponent {
  private _formBuilder = inject(FormBuilder);
  protected estados = ['NUEVO PEDIDO', 'Enviado', 'Entregado', 'Cancelado'];

  datosPedidosForm = this._formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    telefono: ['1122334455', [Validators.required, Validators.minLength(8)]],
    metodoPago: ['Efectivo', Validators.required],
    envio: [true],
    direccion: ['Avenida siempre viva 123', [Validators.required, Validators.minLength(5)]],
    precioCosto: ['25000', Validators.required],
    precioVenta: ['45000', Validators.required],
    estado: ['NUEVO PEDIDO', Validators.required],
  });

  // datosPedidosForm = this._formBuilder.group({
  //   nombre: ['', [Validators.required, Validators.minLength(3)]],
  //   telefono: ['', [Validators.required, Validators.minLength(8)]],
  //   metodoPago: ['', Validators.required],
  //   envio: [true],
  //   direccion: ['', [Validators.required, Validators.minLength(5)]],
  //   precioCosto: ['', Validators.required],
  //   precioVenta: ['', Validators.required],
  //   estado: ['', Validators.required],
  // });

  formValues = toSignal(this.datosPedidosForm.valueChanges);

  constructor() {
    //Subscribirse a formValues y ejecutar la actualizacion del state cuando hay cambios despues de 500ms, el valor es diferente y valido
    this.datosPedidosForm.valueChanges
      .pipe(
        debounceTime(500), // Esperar 500 ms después de que el valor se actualice
        distinctUntilChanged(), // Asegurarse de que los valores sean diferentes
        filter(() => this.datosPedidosForm.valid) // Solo si el formulario es válido
      )
      .subscribe(() => {
        this.confirmarDatosCliente();
      });
  }

  confirmarDatosCliente() {
    agregarDatosCliente(this.datosPedidosForm.value);
  }
}

