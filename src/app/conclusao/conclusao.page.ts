import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public url = 'https://dog.ceo/api/breeds/image/random';
  public imagem = '';
  public result:any = {};

  LabelBotao = 'cadastrar';
  constructor(private http: HttpClient) {}

  gerar() {
    this.consultaApi().subscribe(
      (resp) => {
        this.result = resp;
        this.imagem = this.result.message;
      },
      (error) => {}
    );
  }

  consultaApi() {
    return this.http.get(this.url);
  }

  cadastrar() {
  
  }
}
