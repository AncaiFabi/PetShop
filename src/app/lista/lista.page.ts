import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ListadogsService } from '../services/listadogs.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  cachorro = { nome: '', idade: '',};

  public dogs: any[] = [];

  constructor(
    public nav: NavController,
    public alerta: AlertController,
    public servicos: ListadogsService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.carregadados();
  }

  async voltar() {
    const voltando = await this.alerta.create({
      header: 'ATENÇAO!',
      message: 'Deseja adicionar um novo endereço?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            localStorage.clear();
            this.nav.navigateRoot('/');
          },
        },
      ],
    });

    await voltando.present();
  }

  carregadados(){
    if(this.servicos.listar()){
      this.dogs = this.servicos.listar()!;
      console.log(this.cachorro);
    }
  }
  

}
