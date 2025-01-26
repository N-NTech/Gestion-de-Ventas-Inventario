import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { newPedido } from '../shared/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

   private apiUrl = environment.apiUrl;
   private http = inject(HttpClient);
   

  getAllPedidos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pedido`)
  }

  putPedido(pedido: newPedido): Observable<any> {
    return this.http.put(`${this.apiUrl}/pedido`, pedido)
  }
}
