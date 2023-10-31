import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-principal-view',
  templateUrl: './principal-view.component.html',
  styleUrls: ['./principal-view.component.css']
})
export class PrincipalViewComponent {
  temperature = 0;
  maxLength = 1;
  model = "";
  inputText = "";
  quests:any = []  // Array de objetos
  conversations: any[] = [];

  constructor(private http:HttpClient) { }

  sendQuest() {
    this.conversations.push({quest: this.inputText});
    console.log("Entró a la petición");
    this.http.post('http://localhost:5500/prueba', {prompt: this.inputText}).subscribe((data:any) => {
      this.conversations.push({ answer: data})
      console.log(data);
      
    }, (error) => {
      console.log(error);
    });
     // El subscribe es para que se ejecute la petición
    ;

    this.inputText = "";
  }

}
