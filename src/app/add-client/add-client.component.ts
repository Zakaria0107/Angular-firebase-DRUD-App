import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  public clientForm: FormGroup;
  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) {}
  ngOnInit() {
    this.crudApi.GetClientsList();
    this.clienForm();
  }
  clienForm() {
    this.clientForm = this.fb.group({
      id : [''] ,
      name : [''] , 
      address : [''] , 
      roomNumber : [''] , 
      startDate : [''] ,
      endDate : [''] ,
      Nneight : [''] ,
      roomType : [''] ,
      smooking :[''] ,
      tecketPlaneReference : ['']
    });
  }
  get name() {
    return this.clientForm.get('name');
  }
  get address() {
    return this.clientForm.get('address');
  }
  get roomNumber() {
    return this.clientForm.get('roomNumber');
  }
  get startDate() {
    return this.clientForm.get('startDate');
  }
  get endDate() {
    return this.clientForm.get('endDate');
  }
  get roomType() {
    return this.clientForm.get('roomType');
  }
  get Nneight() {
    return this.clientForm.get('Nneight');
  }
  get smooking() {
    return this.clientForm.get('smooking');
  }
  get tecketPlaneReference(){
    return this.clientForm.get("tecketPlaneReference");
  }
  ResetForm() {
    this.clientForm.reset();
  }
  submitClientData() {
    this.crudApi.AddClient(this.clientForm.value);
    this.toastr.success(
      this.clientForm.controls['name'].value + ' successfully added!'
    );
    this.ResetForm();
  }

}