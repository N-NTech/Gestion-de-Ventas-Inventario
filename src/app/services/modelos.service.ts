import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, computed, signal } from '@angular/core';
import { Modelo } from '../shared/Interfaces';
import { catchError, tap } from 'rxjs';

interface ModelosState {
  modelos: Modelo[];
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ModelosService {
  private apiUrl = 'http://localhost:3000/modelo';
  
  // State
  private state = signal<ModelosState>({
    modelos: [],
    loading: false,
    error: null
  });

  // Selectors
  modelos: Signal<Modelo[]> = computed(() => this.state().modelos);
  loading: Signal<boolean> = computed(() => this.state().loading);
  error: Signal<string | null> = computed(() => this.state().error);

  constructor(private http: HttpClient) {
    this.loadModelos();
  }

  // Actions

  loadModelos(): void {
    this.state.update(state => ({ ...state, loading: true }));
    
    this.http.get<Modelo[]>(this.apiUrl).pipe(
      tap(modelos => {
        this.state.set({
          modelos,
          loading: false,
          error: null
        });
      }),
      catchError(error => {
        this.state.update(state => ({
          ...state,
          loading: false,
          error: error.message
        }));
        throw error;
      })
    ).subscribe();
  }

  // addModelo(modelo: Modelo): void {
  //   this.http.post<Modelo>(this.apiUrl, modelo).pipe(
  //     tap(newModelo => {
  //       this.state.update(state => ({
  //         ...state,
  //         modelos: [...state.modelos, newModelo]
  //       }));
  //     })
  //   ).subscribe();
  // }

  // updateModelo(modelo: Modelo): void {
  //   this.http.put<Modelo>(`${this.apiUrl}/${modelo.id}`, modelo).pipe(
  //     tap(updatedModelo => {
  //       this.state.update(state => ({
  //         ...state,
  //         modelos: state.modelos.map(m => 
  //           m.id === modelo.id ? updatedModelo : m
  //         )
  //       }));
  //     })
  //   ).subscribe();
  // }

  // deleteModelo(id: number): void {
  //   this.http.delete(`${this.apiUrl}/${id}`).pipe(
  //     tap(() => {
  //       this.state.update(state => ({
  //         ...state,
  //         modelos: state.modelos.filter(m => m.id !== id)
  //       }));
  //     })
  //   ).subscribe();
  // }
}
