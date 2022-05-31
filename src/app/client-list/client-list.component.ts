import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Client } from './../shared/client'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  p: number = 1;
  Client: Client[];
  hideWhenNoClient: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  
  constructor(
    public crudApi: CrudService,
    public toastr: ToastrService
    ){ }

  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetClientsList(); 
    s.snapshotChanges().subscribe(data => {
      this.Client = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['id'] = item.key;
        this.Client.push(a as Client);
      })
    })
  }
  dataState() {     
    this.crudApi.GetClientsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoClient = false;
        this.noData = true;
      } else {
        this.hideWhenNoClient = true;
        this.noData = false;
      }
    })
  }
  deleteClient(client : Client) {
    if (window.confirm('Are sure you want to delete this client ?')) { 
      this.crudApi.DeleteClient(client.id)
      this.toastr.success(client.name+ ' successfully deleted!');
    }
  }
}