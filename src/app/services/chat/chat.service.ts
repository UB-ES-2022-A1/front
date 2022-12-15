import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from '../session/session.service';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  baseUrlC: string = environment.backurl + 'chats';
  baseUrlM: string = environment.backurl + 'messages';
  constructor(private http: HttpClient) {}

  getRooms() {
    const url = this.baseUrlC + '/rooms';
    return this.http.get(url);
  }
  getMessages(room_id: number, page: number, pagesize: number) {
    const url = this.baseUrlM + '/get';

    return this.http.post(url, {
      room_id: room_id,
      page: page,
      pagesize: pagesize,
    });
  }
  postMessage(roomId: number, message: string) {
    const url = this.baseUrlM + '/new';
    return this.http.post(url, { chat_room: roomId, text: message });
  }
}
