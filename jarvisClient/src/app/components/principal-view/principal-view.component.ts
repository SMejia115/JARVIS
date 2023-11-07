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
  waiting = false;


  constructor(private http:HttpClient, private sanitizer: DomSanitizer) { 
  }

  sendQuest() {

    this.conversations.push({quest: this.inputText});
    const textArea = document.getElementById('textInput') as HTMLTextAreaElement;
    textArea.style.height = '20px'; // Ajustar la altura en función del contenido
    const prompt = this.inputText;
    this.waiting = true;
    this.conversations.push({waiting: '.'});
    this.inputText = '';
    console.log("Entró a la petición");
    this.http.post('http://localhost:5500/prueba', {prompt: prompt, 
                                                    max_tokens: this.maxLength, 
                                                    model: this.model, 
                                                    temperature: this.temperature}).subscribe((data:any) => {
     
      
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



  formatText(text: string) {
    // Reemplaza las triple comillas por sus entidades HTML correspondientes
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  autoAdjustTextArea(event: any) {

    
    const textArea = event.target;
    if (textArea.scrollHeight > textArea.clientHeight) {
      textArea.style.height = 'auto'; // Restablecer la altura para calcular la altura deseada
      textArea.style.height = textArea.scrollHeight + 'px'; // Ajustar la altura en función del contenido
    }

    if (textArea.scrollHeight < 42) {
      textArea.style.height = '20px'; // Ajustar la altura en función del contenido
    }

    

  }

  onKeyDown(event: KeyboardEvent): void {
    const textArea = event.target as HTMLTextAreaElement;
    textArea.style.height = '20px'; 

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Evita el salto de línea en el textarea
      this.sendQuest(); // Llama a tu función para enviar el mensaje
    }



  }

  
  
}


