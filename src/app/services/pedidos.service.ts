import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

   private apiUrl = environment.apiUrl;
   

  constructor(private http:HttpClient) { }

  getAllPedidos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pedido`)
  }
}
