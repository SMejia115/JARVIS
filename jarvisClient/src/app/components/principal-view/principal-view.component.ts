import { Component, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import hljs from 'highlight.js';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

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
  record: boolean = false;
  recognition: any;
  // speechRecognition: SpeechRecognition;


  constructor(private http:HttpClient, private sanitizer: DomSanitizer, private clipboard: Clipboard) {
    // this.recognition = new (<any>window).webkitSpeechRecognition();
    // this.recognition.lang = 'es-ES';
    // this.recognition.continuous = true;
    // this.recognition.interimResults = false;
    // this.recognition = new (<any>window).webkitSpeechRecognition();
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

  repVoice(text: SafeHtml){
    const textoPlano = this.sanitizer.sanitize(SecurityContext.HTML, text);
    const textoLegible = textoPlano?.replace(/&nbsp;/g, ' ')
    console.log(textoLegible);

    this.http.post('http://localhost:5500/speech', { text: textoLegible }, { responseType: 'blob' }).subscribe((data: Blob) => {
      const audioBlob = new Blob([data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
  
      const audio = new Audio(audioUrl);
      audio.play();
    });
  }

  copyText(text: SafeHtml){
    const textoPlano = this.sanitizer.sanitize(SecurityContext.HTML, text);
    const textoLegible: any = textoPlano?.replace(/&nbsp;/g, ' ')
    if (this.clipboard.copy(textoLegible)) {
      console.log('Texto copiado al portapapeles: ', textoLegible);
    } else {
      console.error('Error al copiar el texto al portapapeles');
    }
  } 
  
  recMic(){
    const chunks: any = [];
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream);

      console.log(mediaRecorder.state);
      console.log(mediaRecorder);
      console.log("recorder started");
      
      mediaRecorder.ondataavailable = function(e) {
        console.log("data available");
        console.log(e.data);
        chunks.push(e.data);
      }

      mediaRecorder.onstop = function() {
        console.log("recording stopped");
        // Aquí puedes procesar los datos almacenados en 'chunks'
        const blob = new Blob(chunks, { type: 'audio/wav' });
        // blob es el archivo de audio que puedes enviar a tu API o manipular
      }

      mediaRecorder.start();

      // Suponiendo que deseas que la grabación dure un tiempo determinado
      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000); // Detiene la grabación después de 5 segundos (5000 ms)
    });
  }
    
  
  stopRecord(){
    this.record = false;
  }
}  
