import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Modelo } from '../shared/Interfaces';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/modelo';

  private modelosResource = rxResource<Modelo[], Error>({
    loader: () => this.http.get<Modelo[]>(this.apiUrl)
  })
  
  modelos = this.modelosResource.value;
  loading = this.modelosResource.isLoading;
  error = this.modelosResource.error;

  constructor() {
    this.modelosResource.reload(); 
  }

  refresh(): void {
    this.modelosResource.reload();
  }
}
