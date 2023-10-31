import { Component } from '@angular/core';

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

  constructor() { }

  sendQuest() {
    this.conversations.push({ quest: this.inputText, answer: "No se ha respondido" });
    this.inputText = "";
  }

}
