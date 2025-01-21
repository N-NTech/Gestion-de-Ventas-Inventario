import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Resource, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { Modelo } from '../shared/Interfaces';
import { rxResource } from '@angular/core/rxjs-interop';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/modelo';

  private modelosResource = rxResource<Modelo[], Error>({
    loader: () => this.http.get<Modelo[]>(this.apiUrl).pipe(
      map((response: any) => response),
      // delay(5000),
    )
  })
  
  modelResourcePublic: modelResourcePublic = {
    modelos: this.modelosResource.value,
    loading: this.modelosResource.isLoading,
    error: computed(() => this.modelosResource.error() as unknown as HttpErrorResponse),
  }

  constructor() {
    this.refresh(); 
  }

  refresh(): void {
    this.modelosResource.reload();
  }
}

interface modelResourcePublic {
  modelos: WritableSignal<Modelo[] | undefined>;
  loading: Signal<boolean>;
  error: Signal<HttpErrorResponse | undefined>;
}
