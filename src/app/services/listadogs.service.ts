import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListadogsService {
  public url = 'https://dog.ceo/api/breeds/image/random';
  public imagem = '';
  public result:any = {};

  colecaodogs: any[] = [];
  key = 'dogs';

  constructor(private http: HttpClient) { }

   async salvadogs( nomes: string, idades: string ){
    const dados = {
      nome : nomes,
      idade : idades,
      imagem : await this.gerar()
    };

    const values = localStorage.getItem(this.key)

    if(!values){
      this.colecaodogs.push(dados)
      localStorage.setItem(this.key, JSON.stringify(this.colecaodogs))
    }else{
      const colecao: any[] = this.listar()!;
      colecao.push(dados);
      localStorage.setItem(this.key, JSON.stringify(colecao))
    }


  }

  listar(){
    const values = localStorage.getItem(this.key);

    if(!values)
      return;

    const colecao: any[] = JSON.parse(values);
    return colecao;
  }

  deletar(params: any){
    const values = this.listar();
    const result = values?.filter((cachorro) => cachorro.nome !== params);

    localStorage.setItem(this.key, JSON.stringify(result));
  }

  gerar(){
    return new Promise<string>(async (resolve, reject) => {
      try{
        const resp = await this.consultaApi().toPromise();
        this.result = resp;
        resolve(this.result.message);
      } catch(error){
        reject(error);
      }
    });
  }

  consultaApi(){
    return this.http.get(this.url);
  }


}
