import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pedidos-page',
  standalone: true,
  imports: [],
  templateUrl: './pedidos-page.component.html',
  styleUrl: './pedidos-page.component.css'
})
export class PedidosPageComponent {

  constructor( private http : HttpClient){
  }

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((data) => {
      console.log(data);
    })
  }

}
