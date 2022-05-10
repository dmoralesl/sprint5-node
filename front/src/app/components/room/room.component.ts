import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRoom, IUser } from 'src/app/interfaces/SocketModels';

import { IMessage } from './../../interfaces/SocketModels';
import { RoomService } from 'src/app/services/room.service';
import { SocketService } from 'src/app/services/socket.service';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  providers: [
    {provide: 'roomId', useValue: "roomId"},
  ]
})
export class RoomComponent implements OnInit, AfterViewChecked {
    roomId: string = "";
    roomData: IRoom;
    messages: IMessage[] = [];
    users: IUser[] = [];
    currentUser?: IUser;

    backLogo = faCircleLeft;
    @ViewChild("chatPanel") chatPanel: ElementRef;
    
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private socketService: SocketService,
      private roomService: RoomService,
    ) {
      if (!sessionStorage.getItem('chatUser')) {this.router.navigate(['/']);}
      this.currentUser = JSON.parse(sessionStorage.getItem('chatUser') ?? "")
      this.roomId = this.route.snapshot.params['id'];
     }

  async ngOnInit(): Promise<void> {
    this.roomData =  await this.roomService.getRoomData(this.roomId);
    this.roomData.users = this.roomData.users.map(user => ({...user, color: this.createRandomColor()}));
    this.socketService.startSocket(this.roomId, this.currentUser?._id);
    this.socketService.OnNewMessage().subscribe(this.newMessage.bind(this));
		this.socketService.OnUserJoinRoom().subscribe(this.userJoinRoom.bind(this));
		this.socketService.OnUserLeftRoom().subscribe(this.userLeftRoom.bind(this));
  }

  @HostListener('window:beforeunload', ['$event'])
  leaveChatWarn(event: Event) {
    sessionStorage.removeItem('chatUser');
    return false;
  }

  ngAfterViewChecked() {        
    this.chatPanel.nativeElement.scrollTo(0, this.chatPanel.nativeElement.scrollTopMax)    
  } 

  messageForm: FormGroup = new FormGroup({
    messageContent: new FormControl('', Validators.required),
  });

  async sendMessage() {
    this.roomService.sendMessage({
      content: this.messageForm.get('messageContent')?.value, 
      user: this.currentUser ?? {name: "Anon User"}
    }, this.roomId);
    this.messageForm.reset();
  }

  async goToLobby(): Promise<void> {
    this.socketService.disconnectSocket();
    const userRemoved = await this.roomService.removeUserFromRoom(this.roomId, this.currentUser?._id || "");
    if (userRemoved) {
      this.router.navigate(['lobby']);
    }
  }

  newMessage(message: IMessage) {
    this.roomData.messages.push(message)
  }
  
  userLeftRoom(userId: string) {
    const user = this.roomData?.users?.find(u => userId === u._id);
    if (user) {
      this.roomData.users = this.roomData?.users?.filter(u => userId !== u._id);
      this.roomData.messages.push({
        content: `User ${user.name} left the room`,
        user: {name: "system"},
        createdAt: new Date()
      })
    }
  }

  userJoinRoom(user: IUser) {
    this.roomData.users.push({...user, color: this.createRandomColor()});
    this.roomData.messages.push({
      content: `User ${user.name} joined the room`,
      user: {name: "system"},
      createdAt: new Date()
    });
  }

  createRandomColor(): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
  getUserColor(userId: string='gray') {
    const user = this.roomData.users.find((user: IUser) => userId === user._id);
    return user?.color ?? userId;
  }
}
