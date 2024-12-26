import { Producto } from "../pages/modelos-page/modelos-page.component";
import { signal, WritableSignal } from '@angular/core';

const pedidoList: WritableSignal<Producto[]> = signal([]);

export { pedidoList };