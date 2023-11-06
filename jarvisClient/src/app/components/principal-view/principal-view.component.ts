import { Component, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import hljs from 'highlight.js';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-principal-view',
  templateUrl: './principal-view.component.html',
  styleUrls: ['./principal-view.component.css']
})
export class PrincipalViewComponent {
  temperature = 0;
  maxLength = 1;
  model = "gpt-3.5-turbo";
  inputText = "";
  quests:any = []  // Array de objetos
  conversations: any[] = [];


  constructor(private http:HttpClient, private sanitizer: DomSanitizer) { 
  }

  sendQuest() {

    this.conversations.push({quest: this.inputText});
    this.conversations.push({answer: "Se está generando la respuesta..."});
    const inputDiv = document.querySelector('.input-div') as HTMLElement;
    inputDiv.textContent = '';
    console.log("Entró a la petición");
    this.http.post('http://localhost:5500/prueba', {prompt: this.inputText, 
                                                    max_tokens: this.maxLength, 
                                                    model: this.model, 
                                                    temperature: this.temperature}).subscribe((data:any) => {
     
      this.inputText = '';
      this.conversations.pop();
      console.log(data.replace(/\n/g, '<br>'))
      let  formattedText = this.formatText(data);
      let answer = this.sanitizer.bypassSecurityTrustHtml(formattedText.replace(/(\r\n|\n|\r)/g, '<br>$1').replace(/ /g, '&nbsp;'));
      this.conversations.push({ answer: answer})
      
      
       
    }, (error) => {
      console.log(error);
    });
     // El subscribe es para que se ejecute la petición
      // Comprueba que el valor de inputText sea realmente una cadena vacía


    // Además, restablece el contenido del div a una cadena vacía
    

    
  }

  onInput(event: any) {
    this.inputText = event.target.textContent; // Actualiza inputText
    this.togglePlaceholder();
  }

  togglePlaceholder() {
    const div = document.querySelector('.input-div') as HTMLElement;
    const placeholder:any = div.nextElementSibling;
    if (div.textContent === '') {
      placeholder.style.display = 'block';
    } else {
      placeholder.style.display = 'none';
    }
  }

  formatText(text: string) {
    // Reemplaza las triple comillas por sus entidades HTML correspondientes
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  
  
}


