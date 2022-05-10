import { IMessage, IRoom } from '../interfaces/SocketModels';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor() { }

  sendMessage(message: IMessage, roomId: string) {
    return fetch(`http://localhost:3000/rooms/${roomId}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
  }

  async getRoomData(roomId: string): Promise<IRoom> {
    const response = await fetch(`http://localhost:3000/rooms/${roomId}`);
    const parsedResponse = await response.json();

    return parsedResponse?.data;

  }
  async removeUserFromRoom(roomId: string, userId: string): Promise<boolean> {
    const response = await fetch(`http://localhost:3000/rooms/${roomId}/${userId}`, {
      method: 'DELETE'
    });
    const parsedResponse = await response.json();

    return !parsedResponse.error;
  }

}
