import { Routes } from '@angular/router';
import { PedidosPageComponent } from './pages/pedidos-page/pedidos-page.component';
import { StockPageComponent } from './pages/stock-page/stock-page.component';
import { ModelosPageComponent } from './pages/modelos-page/modelos-page.component';


export const routes: Routes = [
    {path: '', redirectTo: 'pedidos', pathMatch: 'full'},
    {path: 'pedidos', component: PedidosPageComponent},
    {path: 'stock', component: StockPageComponent},
    {path: 'modelos', component: ModelosPageComponent},
    {path: '**', redirectTo: 'pedidos'}
];
