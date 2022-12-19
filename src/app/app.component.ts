import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { Message } from './models/Message.model';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from './services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'app';
  // user: string;
  // message: string;

  private _hubConnection: HubConnection;
  msgs: Message[] = [];
  message: Message;

  txtMessage: string = '';  
  uniqueID: string = new Date().getTime().toString();  

  constructor(private http: HttpClient, private signalRService : SignalRService) {
  }

  ngOnInit(): void {
    this.signalRService.startConnection();
    // this.signalRService.addTransferDataListener(this.msgs);
    this.signalRService.addTransferDataListener(this.msgs, this.uniqueID);

  }
  
  public startHttpRequest = () => {
    this.http.get('').subscribe(res => {
      console.log(res)
    })
  }

  public sendMessage(){
    // this.signalRService.invokeAction("SendMessage", this.user, this.message);
    if (this.txtMessage) {
      this.message = new Message();
      this.message.user = this.uniqueID;  
      this.message.type = "sent";  
      this.message.message = this.txtMessage;  
      this.message.date = new Date();  
      this.msgs.push(this.message);  
      this.signalRService.invokeAction("SendMessage", this.message);  
      this.txtMessage = '';  
    } 
    
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


