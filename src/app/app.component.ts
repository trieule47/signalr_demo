import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { Message } from './models/Message.model';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from './services/signalr.service';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit, AfterViewChecked  {
  title = 'app';
  // user: string;
  // message: string;

  private _hubConnection: HubConnection;
  msgs: Message[] = [];
  message: Message;
  selectedOption = "all";
  connectionIds: string[] = []; 

  txtMessage: string = '';  
  uniqueID: string = new Date().getTime().toString();
  user = {id: this.uniqueID, name:""};

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private http: HttpClient, private signalRService : SignalRService) {
  }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addTransferDataListener(this.msgs, this.uniqueID, this.connectionIds, this.user);
    this.scrollToBottom();

  }
  
  public startHttpRequest = () => {
    this.http.get('').subscribe(res => {
      console.log(res)
    })
  }

  public sendMessage(){
    if (this.txtMessage) {
      this.message = new Message();
      this.message.user = this.uniqueID;  
      this.message.type = "sent";  
      this.message.message = this.txtMessage;  
      this.message.date = new Date();  
      this.msgs.push(this.message);  
      this.signalRService.invokeAction(this.selectedOption,this.message);  
      this.txtMessage = '';  
    } 
    
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }

  showSuccess() {
    // this.signalRService.addTransferDataListener.subscribe((message: Message) => {  
    //   this._ngZone.run(() => {  
    //     if (message.clientuniqueid !== this.uniqueID) {  
    //       message.type = "received";  
    //       this.messages.push(message);  
    //     }  
    //   });  
    // });  
  // }  
  }

  
}


