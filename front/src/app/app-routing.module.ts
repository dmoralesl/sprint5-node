import { RouterModule, Routes } from '@angular/router';

import { LobbyComponent } from './components/lobby/lobby.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RoomComponent } from './components/room/room.component';

const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'lobby', component: LobbyComponent  },
  {path: 'room/:id', component: RoomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
