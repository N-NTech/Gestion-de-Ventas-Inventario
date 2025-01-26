import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, linkedSignal, OnChanges, Signal } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { agregarDatosCliente, calcularCostoTotalPedido, calcularTotalPedido } from '../../../shared/pedido-store';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { capitalizar } from '../../../utils/pedidosUtils';

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
          <mat-option value="EFECTIVO">Efectivo</mat-option>
          <mat-option value="TRANSFERENCIA">Transferencia</mat-option>
          <mat-option value="QR">QR</mat-option>
          <mat-option value="LINK_DE_PAGO">Link de pago</mat-option>
          <mat-option value="TARJETA_DEBITO">Tarjeta</mat-option>
          <mat-option value="TARJETA_CREDITO">Tarjeta</mat-option>

        </mat-select>
      </mat-form-field>
      
      <mat-form-field>
        <mat-label>Estado</mat-label>
        <mat-select formControlName="estado" required>
          @for (estado of estados; track estado) {
            <mat-option [value]="estado">{{capitalizar(estado)}}</mat-option>
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
  protected estados = ['NUEVO PEDIDO', 'PAGO PENDIENTE', 'RETIRO PENDIENTE', 'ENVIO PENDIENTE', 'ENTREGADO', 'CANCELADO', 'SIN STOCK'];

  precioVentaSignal = computed(() => calcularTotalPedido())

  datosPedidosForm = this._formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    telefono: ['1122334455', [Validators.required, Validators.minLength(8)]],
    metodoPago: ['EFECTIVO', Validators.required],
    envio: [true],
    direccion: ['Avenida siempre viva 123', [Validators.required, Validators.minLength(5)]],
    precioCosto: [0, Validators.required],
    precioVenta: [0, Validators.required],
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

    //TODO: Estoy muy seguro que se tiene que poder lograr evitando el effect, revisar video de Gentleman
    //Este effect actualiza el precio del form cuando se ajusta la señal de precioVenta que esta ligada a calcularTotalPedido()
    effect(() => {
      const nuevoPrecioVenta = this.precioVentaSignal();
      const nuevoPrecioCosto = calcularCostoTotalPedido();

      this.datosPedidosForm.controls.precioVenta.setValue(nuevoPrecioVenta);
      this.datosPedidosForm.controls.precioCosto.setValue(nuevoPrecioCosto);

      console.log("EFFECT")
    });

    console.log(calcularTotalPedido)
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

  capitalizar(string: string) {
    return capitalizar(string)
  }

  confirmarDatosCliente() {
    agregarDatosCliente(this.datosPedidosForm.value);
  }
}

