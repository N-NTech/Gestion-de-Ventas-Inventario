import { Routes } from '@angular/router';
import { PedidosPageComponent } from './pages/pedidos-page/pedidos-page.component';
import { StockPageComponent } from './pages/stock-page/stock-page.component';

export const routes: Routes = [
    {path: '', redirectTo: 'pedidos', pathMatch: 'full'},
    {path: 'pedidos', component: PedidosPageComponent},
    {path: 'stock', component: StockPageComponent},
    {path: '**', redirectTo: 'pedidos'}
];
