import { Injectable } from "@angular/core";
import * as signalR from '@aspnet/signalr';
import { Message } from "../models/Message.model";

@Injectable()
export class SignalRService {
    data: any;
    private hubConnection: signalR.HubConnection;

    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7154/chatHub')
            .build();
        this.hubConnection
            .start()
            .then(()=>console.log("connection started"))
            .catch( err => console.log("Error while starting connection: "+ err))
    }

    public addTransferDataListener = (msgs: Message[], user: string) => {
        console.log(`data input: ${msgs}`);
        this.hubConnection.on("ReceiveMessage", (message) =>{
            console.log(`data: ${message}`);
            if (message.user !== user) {  
                message.type = "received";  
                msgs.push(message);             
            }  

            console.log('1'+message);
        })
    }

    public invokeAction(action:string, message:Message){
        this.hubConnection.invoke(action, message)
        .catch(err=> {
          return console.log(err.toString());
        });
    }

    constructor(){
    }
}


// import { Injectable } from "@angular/core";
// import * as signalR from '@aspnet/signalr';
// import { Message } from "../models/Message.model";

// @Injectable()
// export class SignalRService {
//     data: any;
//     private hubConnection: signalR.HubConnection;

//     public startConnection = () => {
//         this.hubConnection = new signalR.HubConnectionBuilder()
//             .withUrl('https://localhost:7154/chatHub')
//             .build();
//         this.hubConnection
//             .start()
//             .then(()=>console.log("connection started"))
//             .catch( err => console.log("Error while starting connection: "+ err))
//     }

//     public addTransferDataListener = (msgs: Message[]) => {
//         this.hubConnection.on("ReceiveMessage", (user, message) =>{
//             console.log(`data: ${user} - says - ${message}`);
//             this.data = {user: user, message: message};
//             msgs.push(this.data);
//             console.log(this.data);
//         })
//     }

//     public invokeAction(action:string, user:string, message:string){
//         this.hubConnection.invoke(action, user, message)
//         .catch(err=> {
//           return console.log(err.toString());
//         });
//     }

//     constructor(){
//     }
// }
