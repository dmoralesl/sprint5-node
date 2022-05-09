import { Socket, SocketIoConfig } from 'ngx-socket-io';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {}

  // Start socket joining to room. But if value is not provided 
  // then it will join to lobby. This logic is useful because allow us 
  // to reuse Service in different components like room and lobby.
  startSocket(roomId: string='lobby', userId: string="") {
    this.socket.disconnect();

    const socketConfig: SocketIoConfig  = {
      url: 'http://localhost:3000',
      options: {
        transports: ['websocket'],
        query: {roomId, userId}
      }
    }

    this.socket = new Socket(socketConfig );
  }

  disconnectSocket() {
    this.socket.disconnect();
  }

  OnNewMessage(): Observable<any> {
    return this.socket.fromEvent('newMessage');
  }

  OnNewRoom(): Observable<any> {
    return this.socket.fromEvent('newRoom');
  }

  OnRemovedRoom(): Observable<any> {
    return this.socket.fromEvent('removedRoom');
  }

  OnUserJoinRoom(): Observable<any> {
    return this.socket.fromEvent('userJoinRoom');
  }

  OnUserLeftRoom(): Observable<any> {
    return this.socket.fromEvent('userLeftRoom');
  }

}