import { IRoom } from '../interfaces/SocketModels';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  jsonHeaders: HeadersInit = {
    'Content-Type': 'application/json'
  }

  constructor() { }

  async getRoomsInLobby(): Promise<IRoom[]> {
    const response = await fetch(`http://localhost:3000/rooms`);
    const parsedResponse = await response.json();
    return parsedResponse.data;
  }

  async addRoom(room: IRoom): Promise<void> {
    const response = await fetch(`http://localhost:3000/rooms`, {
      method: 'POST',
      headers: this.jsonHeaders,
      body: JSON.stringify(room)
    })
  }

  async removeRoom(roomId: string): Promise<void> {
    const response = await fetch(`http://localhost:3000/rooms/${roomId}`, {
       method: 'DELETE'
      })
  }

  async addUserToRoom(roomId: string, userId: string): Promise<boolean> {
    const response = await fetch(`http://localhost:3000/rooms/${roomId}`, {
      method: 'POST',
      headers: this.jsonHeaders,
      body: JSON.stringify({ userId })
    });
    const parsedResponse = await response.json();

    return !parsedResponse.error;
  }

}
