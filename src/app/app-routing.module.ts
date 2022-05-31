import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent  } from './add-client/add-client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { EditClientComponent } from './edit-client/edit-client.component';

const routes: Routes = [
  { path: '', redirectTo: '/view-clients', pathMatch: 'full' },
  { path: 'register-client', component: AddClientComponent },
  { path: 'view-clients', component: ClientListComponent },
  { path: 'edit-client/:id', component: EditClientComponent }
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
