import { Component, HostListener, OnInit } from '@angular/core';
import { IRoom, IUser } from 'src/app/interfaces/SocketModels';

import { AuthService } from 'src/app/services/auth.service';
import { LobbyService } from './../../services/lobby.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  exitLogo = faPersonWalkingArrowRight;
  rooms: IRoom[] = [];
  user: IUser;
  
  constructor(
    private socketService: SocketService,
    private lobbyService: LobbyService,
    private router: Router,
    private authService: AuthService
  ) {
    if (!sessionStorage.getItem('chatUser')) {this.goToLogin();}
    this.user = JSON.parse(sessionStorage.getItem('chatUser') || "");
    this.socketService.startSocket('lobby', this.user._id);
   }

  async ngOnInit(): Promise<void> {
    this.rooms = (await this.lobbyService.getRoomsInLobby()).sort((a,b) => b.users.length - a.users.length);
		this.socketService.OnNewRoom().subscribe(this.onNewRoom.bind(this));
		this.socketService.OnRemovedRoom().subscribe(this.onRemoveRoom.bind(this));
  }

  @HostListener('window:beforeunload', ['$event'])
  leaveChatWarn(event: Event) {
    sessionStorage.removeItem('chatUser');
    return false;
  }


  async goToDetail(roomId: string): Promise<void> {
    const userAdded = await this.lobbyService.addUserToRoom(roomId, this.user._id || "")
    if (userAdded) {
      this.router.navigate(['room', roomId]);
    }
  }

  async logOut(): Promise<void> {
    this.authService.logoutUser(this.user._id ?? "")

    sessionStorage.removeItem('chatUser');
    this.goToLogin();
  }

  goToLogin(): void {
    this.router.navigate(['/']);
  }

  onNewRoom(room: IRoom) {
    this.rooms.push(room)
  }

  onRemoveRoom(roomId: string) {
    this.rooms = this.rooms.filter((r: IRoom) => r._id !== roomId);
  }

  async createNewRoom(): Promise<void> {
    const name = prompt("Introdue your room name: ") ?? ""
    if (name === "" || name === null) {
      alert("Room name cannot be empty!");
      return;
    }

    const description = prompt("Quick description of room (press ENTER to skip)") ?? ""
    await this.lobbyService.addRoom({
      name,
      description,
      createdBy: this.user,
      users: [],
      messages: []

    })
  }

  async removeRoom(roomId: string): Promise<void> {
    const confirmation = confirm('Are you sure you want to remove this room?')
    if (!confirmation) {return;}
    await this.lobbyService.removeRoom(roomId);
  }

}
