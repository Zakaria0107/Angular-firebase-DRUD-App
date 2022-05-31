import { Injectable } from '@angular/core';
import { Client } from '../shared/client';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  clientsRef: AngularFireList<any>;
  clientRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}
  

  calculatePrice(client : Client){
    client.price = 0;
    if(client.roomType == "Single"){
      client.price += client.Nneight*1200;
    }else if (client.roomType == "Double"){
      client.price += client.Nneight*1600 ; 
    }else {
      client.price += client.Nneight*1900 ;
    }
    if(client.tecketPlaneReference != ""){
      client.price += 2000;
    }
  }
  AddClient(client: Client) {
    this.calculatePrice(client);
    this.clientsRef.push({
      id : client.id ,
      name : client.name, 
      address : client.address , 
      roomNumber : client.roomNumber , 
      startDate : client.startDate,
      endDate : client.endDate,
      Nneight : client.Nneight ,
      roomType : client.roomType,
      smooking :client.smooking,
      tecketPlaneReference : client.tecketPlaneReference,
      price : client.price
    });
  }

  GetClient(id: string) {
    this.clientRef = this.db.object('clients-list/' + id);
    return this.clientRef;
  }

  GetClientsList() {
    this.clientsRef = this.db.list('clients-list');
    return this.clientsRef;
  }

  UpdateClient(client: Client) {
    this.calculatePrice(client);
    this.clientRef.update({
      id : client.id ,
      name : client.name, 
      address : client.address , 
      roomNumber : client.roomNumber , 
      startDate : client.startDate,
      endDate : client.endDate,
      Nneight : client.Nneight ,
      roomType : client.roomType,
      smooking :client.smooking,
      tecketPlaneReference : client.tecketPlaneReference, 
      price: client.price
    });
  }
  DeleteClient(id: string) {
    this.clientRef = this.db.object('clients-list/' + id);
    this.clientRef.remove();
  }
}