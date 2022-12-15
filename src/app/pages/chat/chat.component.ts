import { Component, OnInit } from '@angular/core';
import { MessageTO } from 'src/app/entities/MessageTO';
import { RoomTO } from 'src/app/entities/RoomTO';
import { ChatService } from 'src/app/services/chat/chat.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  constructor(
    private chatService: ChatService,
    private sessionService: SessionService
  ) {}
  currentRoom: number = 1;
  messages: MessageTO[] = [];
  messageToSend: string;
  rooms: RoomTO[] = [];
  page = 0;
  pagesize = 15;
  currentUserEmail = this.sessionService.get('email');
  ngOnInit(): void {
    this.chatService.getRooms().subscribe((sessions: any) => {
      sessions.forEach((room: any) => {
        let newRoom: RoomTO = {
          contracted_service: room.contracted_service,
          room_id: room.contracted_service.id,
          update: room.update,
          customer_email: room.contracted_service.user,
          seller_email: room.contracted_service.service.user,
        };
        let seller = newRoom.seller_email === this.currentUserEmail;
        newRoom.seller = seller;
        this.rooms.push(newRoom);
      });
    });
  }
  sendMessage(): void {
    console.log(this.messageToSend);
    this.chatService
      .postMessage(this.currentRoom, this.messageToSend)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
  getSessionMessages() {
    this.messages = [];
    this.chatService
      .getMessages(this.currentRoom, this.page, this.pagesize)
      .subscribe((messages: any) => {
        messages.forEach((message: any) => {
          let newMessage: MessageTO = {
            user: message.user,
            text: message.text,
            state: message.state,
            time: message.time,
            id: message.id,
          };
          if (newMessage.text !== '') {
            this.messages.push(newMessage);
          }
        });
      });
  }
  changeRoom(id: number): void {
    console.log(id);
    this.currentRoom = id;
    this.getSessionMessages();
  }
}
