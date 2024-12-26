import { ChangeDetectionStrategy, Component, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterLink } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatToolbarRow } from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import { ModeloCardComponent } from '../../components/modelo-card/modelo-card.component';
import { pedidoList } from '../../shared/carrito-store';

export interface Modelo {
  id: number;
  nombre: string;
  marca: {id: number, nombre: string};
  variante: string;
  imagen: string;
  precioVenta: number;
  talles: number[];
}

export interface Producto {
  id: number;
  categoria: string;
  modelo: {
    nombre: string;
    variante: string;
    id: number;
  };
  talle: number | undefined;
  stock: number;
}


@Component({
  selector: 'app-modelos-page',
  standalone: true,
  imports: [CommonModule, MatToolbarModule,ModeloCardComponent],
  styleUrl: './modelos-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./modelos-page.component.html`,
})
export class ModelosPageComponent {  
  
  constructor() { }

  productList: Producto[] = [
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Rojo y Negro con charol",
            "id": 1
        },
        "talle": 35,
        "stock": 1,
        "id": 2
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Rojo y Negro con charol",
            "id": 1
        },
        "talle": 36,
        "stock": 1,
        "id": 3
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Rojo y Negro con charol",
            "id": 1
        },
        "talle": 37,
        "stock": 1,
        "id": 4
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Rojo y Negro con charol",
            "id": 1
        },
        "talle": 38,
        "stock": 0,
        "id": 5
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Rojo y Negro con charol",
            "id": 1
        },
        "talle": 39,
        "stock": 0,
        "id": 6
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Rojo y Negro con charol",
            "id": 1
        },
        "talle": 40,
        "stock": 1,
        "id": 7
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Rojo y Negro con charol",
            "id": 1
        },
        "talle": 41,
        "stock": 0,
        "id": 8
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Rojo y Negro con charol",
            "id": 1
        },
        "talle": 42,
        "stock": 1,
        "id": 9
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Rojo y Negro con charol",
            "id": 1
        },
        "talle": 43,
        "stock": 1,
        "id": 10
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Rojo y Negro con charol",
            "id": 1
        },
        "talle": 44,
        "stock": 1,
        "id": 11
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Gris pipa Gris",
            "id": 5
        },
        "talle": 41,
        "stock": 0,
        "id": 48
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Negro con charol",
            "id": 2
        },
        "talle": 41,
        "stock": 1,
        "id": 18
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro con charol",
            "id": 3
        },
        "talle": 38,
        "stock": 1,
        "id": 25
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro con charol",
            "id": 3
        },
        "talle": 43,
        "stock": 0,
        "id": 30
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Negro con charol",
            "id": 2
        },
        "talle": 40,
        "stock": 1,
        "id": 17
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Negro con charol",
            "id": 2
        },
        "talle": 44,
        "stock": 0,
        "id": 21
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Negro con charol",
            "id": 2
        },
        "talle": 37,
        "stock": 0,
        "id": 14
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Negro con charol",
            "id": 2
        },
        "talle": 38,
        "stock": 1,
        "id": 15
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro con charol",
            "id": 3
        },
        "talle": 39,
        "stock": 1,
        "id": 26
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro",
            "id": 4
        },
        "talle": 43,
        "stock": 0,
        "id": 40
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Negro con charol",
            "id": 2
        },
        "talle": 42,
        "stock": 1,
        "id": 19
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Gris pipa Gris",
            "id": 5
        },
        "talle": 44,
        "stock": 1,
        "id": 51
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro con charol",
            "id": 3
        },
        "talle": 40,
        "stock": 1,
        "id": 27
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Gris pipa Gris",
            "id": 5
        },
        "talle": 43,
        "stock": 1,
        "id": 50
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Gris pipa Gris",
            "id": 5
        },
        "talle": 42,
        "stock": 1,
        "id": 49
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro",
            "id": 4
        },
        "talle": 44,
        "stock": 1,
        "id": 41
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Negro con charol",
            "id": 2
        },
        "talle": 35,
        "stock": 1,
        "id": 12
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Negro con charol",
            "id": 2
        },
        "talle": 39,
        "stock": 0,
        "id": 16
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Gris pipa Gris",
            "id": 5
        },
        "talle": 40,
        "stock": 1,
        "id": 47
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Negro con charol",
            "id": 2
        },
        "talle": 43,
        "stock": 1,
        "id": 20
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro con charol",
            "id": 3
        },
        "talle": 37,
        "stock": 0,
        "id": 24
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Gris pipa Gris",
            "id": 5
        },
        "talle": 36,
        "stock": 1,
        "id": 43
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro con charol",
            "id": 3
        },
        "talle": 41,
        "stock": 1,
        "id": 28
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Gris pipa Gris",
            "id": 5
        },
        "talle": 35,
        "stock": 1,
        "id": 42
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro",
            "id": 4
        },
        "talle": 42,
        "stock": 1,
        "id": 39
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro",
            "id": 4
        },
        "talle": 41,
        "stock": 0,
        "id": 38
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro",
            "id": 4
        },
        "talle": 40,
        "stock": 0,
        "id": 37
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro con charol",
            "id": 3
        },
        "talle": 35,
        "stock": 0,
        "id": 22
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro con charol",
            "id": 3
        },
        "talle": 36,
        "stock": 1,
        "id": 23
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Negro con charol",
            "id": 2
        },
        "talle": 36,
        "stock": 0,
        "id": 13
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro con charol",
            "id": 3
        },
        "talle": 44,
        "stock": 1,
        "id": 31
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro con charol",
            "id": 3
        },
        "talle": 42,
        "stock": 0,
        "id": 29
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro",
            "id": 4
        },
        "talle": 38,
        "stock": 1,
        "id": 35
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro",
            "id": 4
        },
        "talle": 39,
        "stock": 1,
        "id": 36
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro",
            "id": 4
        },
        "talle": 37,
        "stock": 1,
        "id": 34
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro",
            "id": 4
        },
        "talle": 35,
        "stock": 0,
        "id": 32
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Blanco y Negro",
            "id": 4
        },
        "talle": 36,
        "stock": 1,
        "id": 33
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Gris pipa Gris",
            "id": 5
        },
        "talle": 37,
        "stock": 1,
        "id": 44
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Gris pipa Gris",
            "id": 5
        },
        "talle": 39,
        "stock": 0,
        "id": 46
    },
    {
        "categoria": "URBANAS",
        "modelo": {
            "nombre": "Jordan High",
            "variante": "Gris pipa Gris",
            "id": 5
        },
        "talle": 38,
        "stock": 0,
        "id": 45
    }
]
  
  modelList: Modelo[] = [
    {
      id: 1,
      nombre: 'Jordan High',
      marca: { id: 1, nombre: 'Nike' },
      variante: 'Space Jam',
      precioVenta: 40000,
      imagen: 'https://modozapatillas.com/upload/productos/galeria/normal/nike-air-jordan-1-mid-space-jam-d41380111f8558d2a5a9da7a095bbd0f.jpeg',
      talles: []
    },
    {
      id: 2,
      nombre: 'Air Max 90',
      marca: { id: 1, nombre: 'Nike' },
      variante: 'Infrared',
      precioVenta: 35000,
      imagen: 'https://modozapatillas.com/upload/productos/galeria/normal/nike-air-jordan-1-mid-space-jam-d41380111f8558d2a5a9da7a095bbd0f.jpeg',
      talles: []
    },
    {
      id: 3,
      nombre: 'UltraBoost 22',
      marca: { id: 2, nombre: 'Adidas' },
      variante: 'Core Black',
      precioVenta: 42000,
      imagen: 'https://modozapatillas.com/upload/productos/galeria/normal/nike-air-jordan-1-mid-space-jam-d41380111f8558d2a5a9da7a095bbd0f.jpeg',
      talles: []
    },
    {
      id: 4,
      nombre: 'Classic Leather',
      marca: { id: 3, nombre: 'Reebok' },
      variante: 'White',
      precioVenta: 28000,
      imagen: 'https://modozapatillas.com/upload/productos/galeria/normal/nike-air-jordan-1-mid-space-jam-d41380111f8558d2a5a9da7a095bbd0f.jpeg',
      talles: []
    },
    {
      id: 5,
      nombre: 'Taylor All Star',
      marca: { id: 4, nombre: 'Converse' },
      variante: 'Black',
      precioVenta: 25000,
      imagen: 'https://modozapatillas.com/upload/productos/galeria/normal/nike-air-jordan-1-mid-space-jam-d41380111f8558d2a5a9da7a095bbd0f.jpeg',
      talles: []
    },
    {
      id: 6,
      nombre: 'Gel-Kayano 28',
      marca: { id: 5, nombre: 'Asics' },
      variante: 'French Blue',
      precioVenta: 37000,
      imagen: 'https://modozapatillas.com/upload/productos/galeria/normal/nike-air-jordan-1-mid-space-jam-d41380111f8558d2a5a9da7a095bbd0f.jpeg',
      talles: []
    },
  ];

  pedidoList: WritableSignal<Producto[]> = pedidoList;

  ngOnInit() {
    // Seteando los talles a los modelos
    this.modelList.forEach(modelo => {
        modelo.talles = this.productList.filter(producto => producto.modelo.id === modelo.id).map(producto => producto.talle).filter((talle): talle is number => talle !== undefined);
    });

    console.log(this.modelList);

  }

}

