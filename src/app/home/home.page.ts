import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavController,ToastController, AlertController } from '@ionic/angular';
import { ListadogsService } from '../services/listadogs.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dados: any = {};
  cachorro = {
    nome: '',
    idade: '',
  };
  
 

  LabelBotao = 'Cadastrar';

  constructor(
    private http: HttpClient,
    public nav: NavController,
    public mensagem: ToastController,
    public servico: ListadogsService) {}

    cadastrar(){
      if(this.cachorro.nome == '' || this.cachorro.idade == ''){
      this.exibeToast('Preencha os dados do seu cãozinho','danger')
      } else {
        this.salvamento();
        this.nav.navigateForward('lista');
      }
    

  }

      salvamento(){
        this.servico.salvadogs(
          this.cachorro.nome, this.cachorro.idade
        );

        this.nav.navigateRoot('lista')
      }


  async exibeToast(msg: string, cor: string) {
    const toast = await this.mensagem.create({
      message: msg,
      duration: 2000,
      position: 'top',
      animated: true,
      color: cor,
    });

    toast.present();
  }
}
